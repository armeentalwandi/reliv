import "reflect-metadata";
import {MikroORM} from "@mikro-orm/core";
//import { prod } from "./constants";
//import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config"; 
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis'
import { prod } from "./constants";
import { MyContext } from "./types";



const main = async () => {
    
    const orm = await MikroORM.init(microConfig); // returns a promise
    await orm.getMigrator().up(); 

    const app = express();
    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();

app.use(
  session({
    name: 'bip',
    store: new RedisStore
    ({ 
      client: redisClient, 
      disableTouch: true
    }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // predicting crsf
        secure: prod // cookie only works in https
      },
    saveUninitialized: false,
    secret: 'coolkids',
    resave: false,
  })
)
 
// adding a graphQl point with Apollo
const apolloServer = new ApolloServer ({

  // schema allows clients know which operations can be performed by the server
  schema: await buildSchema({

    // resolvers transforms the query into an actual result by moving thru every field in the schema
    resolvers: [HelloResolver, PostResolver, UserResolver],
    validate: false
  }),
  context: ({req, res}) => ({ em: orm.em ,req, res}) // function that returns an object for the context 
                                  // and is shared by all resolvers 
});

// creates a graphql endpoint
await apolloServer.start();
apolloServer.applyMiddleware({ app });
app.listen(4000, () => {
  console.log("Server started on Port 4000.");
})



};

main().catch((err) => {
    console.error(err); 
}); 



