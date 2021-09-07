import { 
  Entity, 
  OneToMany, 
  BaseEntity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Post } from "./Post";
import { Updoot } from "./Updoot";

// 4 columns in database table - create migration 
@ObjectType() // changing entity to GraphQL type
@Entity()  
export class User extends BaseEntity {

  @Field() // exposing the graphQL schema
  @PrimaryGeneratedColumn()
  _id!: number;

  @Field()
  @Column({unique: true})
  username!: string;

  
  // no field property because we don't want to be able to query this 
  //  for security purposes. Also hashed to increase security
  @Column()
  password!: string;

  @OneToMany(() => Post, (post) => post.creator )
  posts: Post[];

  @OneToMany(() => Updoot, (updoot) => updoot.user)
  updoots: Updoot[];
   
  @Field()
  @Column({unique: true})
  email!: string;

  @Field(() => String) // without @Field, you can't query based on createdAt
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

}
