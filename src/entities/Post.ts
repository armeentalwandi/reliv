import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

// 4 columns in database table : id, createdAt, updatedAt, and title
@Entity()  //
export class Post {

  @PrimaryKey()
  _id!: number;

  @Property({type: "date"})
  createdAt = new Date();

  @Property({ type:"date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({type: 'text'})
  title!: string;

}