import { ObjectId } from "mongoose";

export interface TypeInterface {
  _id: ObjectId;
  name: string;
  description: string;
  creator: ObjectId;
  category: ObjectId;
}

export interface TypeArrayInterface {
  categories: Array<TypeInterface>;
}
