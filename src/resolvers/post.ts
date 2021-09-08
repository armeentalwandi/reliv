import { Updoot } from "../entities/Updoot";
import {isAuth} from "../middleware/isAuth";
import { Resolver, Query, Ctx, Arg, Int, Mutation, Field, UseMiddleware, InputType, ObjectType, FieldResolver, Root } from "type-graphql";
import { getConnection } from "typeorm";
import { Post } from "../entities/Post";
import { MyContext } from "../types";
import { User } from "../entities/User";


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

   @FieldResolver(() => User)
   creator(@Root() post: Post) {
       return User.findOne(post.creatorId);
   }


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

        const updoot = await Updoot.findOne({where: {postId, userId}})
       
        if (updoot && updoot.value !== finalValue) {
            await getConnection().transaction(async (tm) => {
                await tm.query(
                `update updoot
                set value = $1
                where "postId" = $2 and "userId" = $3`,
                [finalValue, postId, userId]); 

                await tm.query(
                    `update post
                    set points = points + $1
                    where _id = $2`, 

                    [2 * finalValue, postId]
                );

            });

        } else if (!updoot) {
            await getConnection().transaction(async tm => {

                await tm.query(`
                insert into updoot("userId", "postId", value)
        values($1, $2, $3)`, [userId, postId, finalValue]); 

        await tm.query(` update post 
        set points= points + $1
        where _id = $2`, [finalValue, postId]);


            });
        }
        return true;
    }

    // adds a query
    @Query(() => PaginatedPosts) //query returns a array of posts
    async posts(
        @Arg('limit', () => Int) limit: number, 
        @Arg('cursor', () => String, {nullable: true}) cursor: string | null,
        @Ctx() {req}: MyContext
    ): Promise<PaginatedPosts>{
         const realLimit = Math.min(50, limit); 
         const realLimitPlusOne = realLimit + 1;
         console.log(req.session.userId);
         const replacements: any[] = [ realLimitPlusOne ];

         if(req.session.userId) {
             replacements.push(req.session.userId); 
         }
         let cursorIdx = 3; 
         if (cursor) {
             replacements.push(new Date(parseInt(cursor)));
             cursorIdx = replacements.length; 
         }

        // fetching the user data and who created which posts by raw SQL in GraphQL
         const posts = await getConnection().query(`
         select p.*,
         

         ${
             req.session.userId 
            ? '(select value from updoot where "userId" =  $2 and "postId" = p._id) "voteStatus"' 
            : 'null as "voteStatus"'
        }
         from post p
         
         ${cursor ? `where p."createdAt" < $${cursorIdx}` : ""}
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
        @Arg("_id", () => Int) _id: number): Promise<Post | undefined> {
        return Post.findOne( _id); // queries posts where id = ...
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
        @Arg("_id", () => Int) _id: number, 
        @Arg("title") title: string,
        @Arg("text") text: string,
        @Ctx() {req}: MyContext
    ): Promise<Post | null> {
        if (!req.session.userId) {
            throw new Error("not authenticated");
        }
        const result = await getConnection()
        .createQueryBuilder()
        .update(Post)
        .set({title, text})
        .where('_id = :_id and "creatorId" = :creatorId',
         {_id, creatorId: req.session.userId})
        .returning("*")
        .execute();
        
        // updates only if they gave a title name
     return result.raw[0]; 

    }


    @Mutation(() => Boolean)  
    async deletePost( 
        @Arg("_id") _id: number): Promise<boolean> {
            await Post.delete(_id);
            return true;

    }
    
}

