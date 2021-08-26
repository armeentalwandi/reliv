import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field, Int } from "type-graphql";

// 4 columns in database table : id, createdAt, updatedAt, and title
@ObjectType() // changing entity to GraphQL type
@Entity()  //
export class Post {

  @Field() // exposing the graphQL schema
  @PrimaryKey()
  _id!: number;

  @Field(() => String) // without @Field, you can't query based on createdAt
  @Property({type: "date"})
  createdAt = new Date();

  @Field(() => String)
  @Property({ type:"date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({type: 'text'})
  title!: string;

}