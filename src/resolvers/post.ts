import { Updoot } from "../entities/Updoot";
import {isAuth} from "../middleware/isAuth";
import { Resolver, Query, Ctx, Arg, Int, Mutation, Field, UseMiddleware, InputType, ObjectType } from "type-graphql";
import { getConnection } from "typeorm";
import { Post } from "../entities/Post";
import { MyContext } from "../types";

@InputType()
class PostInput {
    @Field()
    title:string;
    @Field()
    text: string;
}

@ObjectType()
class PaginatedPosts {
    @Field(() => [Post])
    posts: Post[];
    @Field()
    hasMore: boolean;
}

@Resolver(Post)
export class PostResolver {

    @Mutation(() => Boolean)
    //@UseMiddleware(isAuth)
    async vote(
        @Arg("postId", () => Int) postId: number, 
        @Arg("value", () => Int) value:number,
        @Ctx() { req }: MyContext) {
        if (!req.session.userId) {
            throw new Error('not authenticated!')
        }
        const isUpdoot = value !== -1; // the idea is if the user passes in a value of 13, we're not going to give the post 13 points or -13. 
        const finalValue = isUpdoot ? 1 : -1;
        const { userId } = req.session;
        // await Updoot.insert({
        //     userId,
        //     postId,
        //     value: finalValue,
        // }); 

        // updating post points where id = post id($2)
        await getConnection().query(`
        START TRANSACTION;
        insert into updoot("userId", "postId", value)
        values(${userId},${postId},${finalValue});
        update post 
        set points= points + ${finalValue}
        where _id = ${postId};
        COMMIT;
        `);
        return true;
    }

    // adds a query
    @Query(() => PaginatedPosts) //query returns a array of posts
    async posts(
        @Arg('limit', () => Int) limit: number, 
        @Arg('cursor', () => String, {nullable: true}) cursor: string | null
    ): Promise<PaginatedPosts>{
         const realLimit = Math.min(50, limit); 
         const realLimitPlusOne = realLimit + 1;

         const replacements: any[] = [realLimitPlusOne];
         if (cursor) {
             replacements.push(new Date(parseInt(cursor)));
         }

        // fetching the user data and who created which posts by raw SQL in GraphQL
         const posts = await getConnection().query(`
         select p.*,
         json_build_object(
             '_id', u._id,
             'username', u.username,
             'email', u.email,
             'createdAt', u."createdAt"
         ) creator
         from post p
         inner join public.user u on u._id = p."creatorId"
         ${cursor ? `where p."createdAt" < $2` : ""}
         order by p."createdAt" DESC
         limit $1
         `, replacements);

        //  const qb = getConnection()
        //     .getRepository(Post)
        //     .createQueryBuilder("p")
        //     .innerJoinAndSelect(
        //         "p.creator", 
        //         "u", // u for user
        //         'u._id = p."creatorId"') // it's joining the user id and creator id columns
        //     .orderBy('p."createdAt"', "DESC")
        //     .take(realLimitPlusOne)
        // // if (cursor) {
        // //     qb.where('p."createdAt"  < :cursor', {cursor: new Date(parseInt(cursor)),});

        // // }

        // const posts = await qb.getMany()
        console.log(posts);
        return { posts: posts.slice(0, realLimit), hasMore: posts.length == realLimitPlusOne,};
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

