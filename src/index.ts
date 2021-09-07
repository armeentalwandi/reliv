import "reflect-metadata"; 
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import {UserResolver} from "./resolvers/user";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis'
import { prod } from "./constants";
import { MyContext } from "./types";
import cors from 'cors';
import { truncate } from "lodash";
import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { truncateSync } from "fs";
import path from "path";


const main = async () => {
  
  const conn = await createConnection ({
    type: 'postgres',
    database: 'reliv2',
    username: 'postgres',
    password: 'postgres',
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Post, User],
  });
  
  await conn.runMigrations();
 

  const app = express();
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();
  app.use( 
    cors({
    origin: true,
    credentials: true,
  })); 

  app.use(
    session({
      name: 'qid',
      store: new RedisStore
      ({ 
        client: redisClient,
        disableTouch: true,
      }),
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
          httpOnly: true,
          sameSite: 'lax', // predicting crsf
          secure: false,// cookie only works in https
        },
      saveUninitialized: false,
      secret: 'coolkidsdffsdfssddsdfsd',
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
  context: ({req, res}) => ({ req, res}) // function that returns an object for the context 
                                  // and is shared by all resolvers 
});

// creates a graphql endpoint
await apolloServer.start();
apolloServer.applyMiddleware({ app, cors:{origin: "http://localhost:3000"} });
app.listen(4000, () => {
  console.log("Server started on Port 4000");
})
};

main().catch((err) => {
    console.error(err); 
});
 



