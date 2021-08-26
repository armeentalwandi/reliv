import {MikroORM} from "@mikro-orm/core";
//import { prod } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config"; 

const main = async () => {
   
    const orm = await MikroORM.init(microConfig); // returns a promise
    await orm.getMigrator().up(); 
    
  //  creates an instance of post , does not put it in the database
  //  const post = orm.em.create(Post, {title: 'first memory'}); 
  //  await orm.em.persistAndFlush(post); // gives access to all the post fields 

  const all_posts = await orm.em.find(Post, {});
  console.log(all_posts); 
};

main().catch((err) => {
    console.error(err); 
}); 



