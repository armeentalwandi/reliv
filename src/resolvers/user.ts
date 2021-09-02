import { Resolver,  Mutation, Arg, InputType, Field, Ctx, ObjectType, Query } from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";
import argon2 from "argon2";
import { sendEmail } from "../utils/sendEmail";
//import { constraintDirective, constraintDirectiveTypeDefs } from "graphql-constraint-directive";

const { constraintDirective, constraintDirectiveTypeDefs } = require('graphql-constraint-directive')


@InputType()
class UsernamePasswordEmailInput {
    @Field()
    username: string
    @Field()
    password: string
    @Field()
    email: string

}

@InputType() 
class UsernamePassword {
    @Field()
    username: string
    @Field()
    password: string
}

@ObjectType()
class Error { // sends a message if there's something wrong w/ a particular field
    @Field()
    field: string; // gives field
    
    @Field()
    message: string; // gives message as disclaimer

}
@ObjectType() //input types can be used as arguments while object type can be returned from mutations
class UserResponse { // either returns errors or user if it worked properly
    @Field(() => [Error], {nullable: true}) // returns error or null
    errors?: Error[];

    @Field(() => User, {nullable: true}) // returns user or null
    user?: User;

}



@Resolver()
export class UserResolver {

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string, // we are going to take email from the user
        @Ctx() {em}: MyContext // if we have the user in the database
    ) {
        const user = await em.findOne(User, {email});
        if (!user) {
            return true;
        }

        await sendEmail(email,'<h1>You have forgotten your password. Better luck next time.</h1>');
        return true;  
    }

    @Query(() => User, { nullable: true})
    async me(@Ctx() { req, em }: MyContext) {
        if (!req.session.userId) {
            return null;
        }

        const user = await em.findOne(User, { _id: req.session.userId});
        return user;
    }
    
    @Mutation(() => UserResponse)   
    async register(
        @Arg('options') options: UsernamePasswordEmailInput,
        @Ctx() { req, em } : MyContext
    ): Promise<UserResponse> {
        if (!options.email.includes('@')) {
            return {
                errors: [{
                    field: "email",
                    message: "invalid email",

                },
            ],
            };
        }
        if (options.username.length <= 2) {
            return {
                errors: [{
                    field: "username",
                    message: "username length must be greater than 2",

                },
            ],
            };
        }
        if (options.password.length <= 6) {
            return {
                errors: [{
                    field: "password",
                    message: "password length  must be greater than 6",

                },
            ],
            };
        }
        const hashedPass = await argon2.hash(options.password); // hashing the pass before storing
        //storing in database: username and password from input
        const user = em.create(User, 
            { username: options.username, 
                password: hashedPass, 
                email: options.email});
        try {
            await em.persistAndFlush(user);
        } catch(err) {
            // error code 23505 = duplicate username/that username already exists
            if (err.code === "23505" || err.detail.includes("already exists")) {
                // duplicate username error
                return {
                    errors: [
                    {
                        field: "username",
                        message: "username or email already taken"

                    },
                    ],
                };
            }
        }

        req.session.userId = user._id;
        return { user }; // because we now have a response object
    }


    //login
    @Mutation(() => UserResponse)
    async login(
        @Arg("options") options: UsernamePassword,
        @Ctx() { em, req }: MyContext
    ): Promise<UserResponse> { // look up the user by the username
        const user = await em.findOne(User, {username: options.username} );
        if (!user) { // if user is not found
            return {
                errors: [{
                    field: "username",
                    message: "Username inputted doesn't exist. Please input the correct one.",
                },
            ],
        };
    }

    // checks if the password matches to the registered one
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
        return {
            errors: [
                {
                    field: "password",
                    message: "incorrect password",
                },
            ],
        };
    }

   req.session.userId = user._id; 

    // if the user exits and the password matches, return user
    return {
        user, 
    }; 
}

@Mutation(() => Boolean) 
    logout(
        @Ctx() {req, res}: MyContext
    ) {
        
        return new Promise((resolve) => req.session.destroy((err) => {
            res.clearCookie('qid'); // clear cookie on logout
            if (err) {
                console.log(err);
                resolve(false);
                return;
            }
            resolve(true);
        })    
        );  // destroy removes session from redis ->we're using redis for session cache
    }

}


