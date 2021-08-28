import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";

// 4 columns in database table - create migration 
@ObjectType() // changing entity to GraphQL type
@Entity()  
export class User {

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
  @Property({type: 'text', unique: true})
  username!: string;

  // no field property because we don't want to be able to query this 
  //  for security purposes. Also hashed to increase security
  @Property({type: 'text'})
  password!: string;

  @Field()
  @Property({type: 'text', unique: true})
  email!: string; 
}
