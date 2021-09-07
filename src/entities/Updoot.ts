import { ObjectType, Field } from "type-graphql";
import { 
  Entity, 
  ManyToOne, 
  BaseEntity, 
  PrimaryColumn,
  Column} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

// this is called a many to many relationship because this is b/w user and post
// several users can upvote the same post and users can upvote many posts so many to many
// user -> joint table <- posts
// user -> updoot <- posts

// 4 columns in database table : id, createdAt, updatedAt, and title
// changing entity to GraphQL type
@ObjectType()
@Entity()  
export class Updoot extends BaseEntity {
  @Field()
  @Column({type: "int"})
  value: number;

  @Field()
  @PrimaryColumn()
  userId: number; 

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.updoots)  //set up foreign key to users table
  user: User; 

  @Field()
  @PrimaryColumn()
  postId: number; 

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.updoots)  //set up foreign key to users table
  post: Post; 

}
