import { Resolver, Query, Ctx, Arg, Int, Mutation } from "type-graphql";
import { Post } from "../entities/Post";
import { MyContext } from "../types";

@Resolver()
export class PostResolver {
    // adds a query
    @Query(() => [Post]) //query returns a array of posts

    // returns posts as Promise
    posts(@Ctx() { em }: MyContext): Promise<Post[]> {
        return em.find(Post, {});
    }


    @Query(() => Post, {nullable: true}) // query by id and graphQl will return post or null
    post( 
        @Arg("_id", () => Int) _id: number, 
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        return em.findOne(Post, { _id }); // queries posts where id = ...
    }

    @Mutation(() => Post) // query is for getting data and mutation is for changing  
    async createPost( 
        @Arg("title") title: string, 
        @Ctx() { em }: MyContext
    ): Promise<Post> {
        const post = em.create(Post, {title}); // creates a post 
        await em.persistAndFlush(post);
        return post;
    }

    @Mutation(() => Post, {nullable: true}) // query is for getting data and mutation is for changing  
    async updatePost( 
        @Arg("_id") _id: number, 
        @Arg("title", () => String, { nullable: true }) title: string, 
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        const post = await em.findOne(Post, {_id}); // updates post based on id by getting it
        if (!post) {
            return null
        }

        // updates only if they gave a title name
        if (typeof title !== "undefined") {
            post.title = title;
            await em.persistAndFlush(post);
        }
        
        return post

    }


    @Mutation(() => Boolean)  
    async deletePost( 
        @Arg("_id") _id: number, 
        @Ctx() { em }: MyContext
    ): Promise<boolean> {

        await em.nativeDelete(Post, { _id});
        return true;

    }
    
}

