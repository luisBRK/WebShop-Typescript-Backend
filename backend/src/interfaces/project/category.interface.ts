import { ObjectId } from "mongoose";

export interface CategoryInterface {
  _id: ObjectId;
  name: string;
  description: string;
  creator: ObjectId;
}

export interface CategoryArrayInterface {
  categories: Array<CategoryInterface>;
}
