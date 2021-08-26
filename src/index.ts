import "reflect-metadata";
import {MikroORM} from "@mikro-orm/core";
//import { prod } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config"; 
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";


const main = async () => {
    
    const orm = await MikroORM.init(microConfig); // returns a promise
    await orm.getMigrator().up(); 
    
  //  creates an instance of post , does not put it in the database
  //  const post = orm.em.create(Post, {title: 'first memory'}); 
  //  await orm.em.persistAndFlush(post); // gives access to all the post fields 

//   const all_posts = await orm.em.find(Post, {});
//   console.log(all_posts); 
const app = express();

// adding a graphQl point with Apollo
const apolloServer = new ApolloServer ({

  // schema allows clients know which operations can be performed by the server
  schema: await buildSchema({

    // resolvers transforms the query into an actual result by moving thru every field in the schema
    resolvers: [HelloResolver, PostResolver],
    validate: false
  }),
  context: () => ({ em: orm.em }) // function that returns an object for the context 
                                  // and is shared by all resolvers 
});

// creates a graphql endpoint
await apolloServer.start();
apolloServer.applyMiddleware({ app });
app.listen(3000, () => {
  console.log("Server started on Port 3000.");
})



};

main().catch((err) => {
    console.error(err); 
}); 



