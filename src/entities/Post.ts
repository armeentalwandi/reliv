import { ObjectType, Field, Int } from "type-graphql";
import { 
  Entity, 
  ManyToOne, 
  BaseEntity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  OneToMany} from "typeorm";
import { Updoot } from "./Updoot";
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

  @Field()
  @Column()
  text!: string; 

  @Field()
  @Column({ type: "int", default: 0})
  points!: number; 

  @Field(() => Int, { nullable: true})
  voteStatus: number | null; // so voteStatus either gonna be 1, -1, or null
  // 1 = upvooted it, -1 = downvooted it, or haven't voted yet on the post

  @Field()
  @Column()
  creatorId: number; 

  @Field()
  @ManyToOne(() => User, user => user.posts)  //set up foreign key to users table
  creator: User; 

  @OneToMany(() => Updoot, (updoot) => updoot.post)
  updoots: Updoot[];

  @Field(() => String) // without @Field, you can't query based on createdAt
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
  // set up which user created the post using many to one relationship
  // we are switching to typeORM because of this
}
