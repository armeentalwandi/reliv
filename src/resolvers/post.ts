import {isAuth} from "src/middleware/isAuth";
import { Resolver, Query, Ctx, Arg, Int, Mutation, Field, UseMiddleware, InputType } from "type-graphql";
import { Post } from "../entities/Post";
import { MyContext } from "../types";

@InputType()
class PostInput {
    @Field()
    title:string;
    @Field()
    text: string
}

;
@Resolver()
export class PostResolver {
    // adds a query
    @Query(() => [Post]) //query returns a array of posts

    // returns posts as Promise
    async posts(): Promise<Post[]> {
        return Post.find();
    }

    @Query(() => Post, {nullable: true}) // query by id and graphQl will return post or null
    post( 
        @Arg("_id") _id: number): Promise<Post | undefined> {
        return Post.findOne(_id); // queries posts where id = ...
    }

    @Mutation(() => Post) // query is for getting data and mutation is for changing  
    //@UseMiddleware(isAuth) this isnt working why??
    async createPost( 
        @Arg("input") input: PostInput,
        @Ctx() {req}: MyContext): Promise<Post> {
            if (!req.session.userId) {
                throw new Error('not authenticated!')
            }
        return Post.create({
            ...input, 
            creatorId: req.session.userId,
        }).save();
    }

    @Mutation(() => Post, {nullable: true}) // query is for getting data and mutation is for changing  
    async updatePost( 
        @Arg("_id") _id: number, 
        @Arg("title", () => String, { nullable: true }) title: string 
        
    ): Promise<Post | null> {
        const post = await Post.findOne(_id); // updates post based on id by getting it
        if (!post) {
            return null
        }

        // updates only if they gave a title name
        if (typeof title !== "undefined") {
            Post.update({_id}, {title}); 
        }
        
        return post;

    }


    @Mutation(() => Boolean)  
    async deletePost( 
        @Arg("_id") _id: number): Promise<boolean> {
            await Post.delete(_id);
            return true;

    }
    
}

