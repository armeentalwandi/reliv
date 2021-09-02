import { ObjectType, Field } from "type-graphql";
import { 
  Entity, 
  ManyToOne, 
  BaseEntity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn } from "typeorm";
import { User } from "./User";

// 4 columns in database table : id, createdAt, updatedAt, and title
@ObjectType() // changing entity to GraphQL type
@Entity()  //
export class Post extends BaseEntity {

  @Field() // exposing this in a graphQL schema
  @PrimaryGeneratedColumn()
  _id!: number;

  @Field()
  @Column()
  title!: string;

  //@Field()
  //@Column()
  //text!: string; 

  //@Field()
  //@Column({ type: "int", default: 0})
  //points!: number; 

  //@Field()
  //@Column()
  //creatorId: number; 

  //@ManyToOne(() => User, user => user.posts)  //set up foreign key to users table
  //creator: User; 

  @Field(() => String) // without @Field, you can't query based on createdAt
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  
  // set up which user created the post using many to one relationship
  // we are switching to typeORM
}
