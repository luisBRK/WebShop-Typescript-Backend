import { ObjectId } from "mongoose";

export interface ProductInterface {
  name: string;
  image: string;
  price: number;
  size: string;
  weight: number;
  color: string;
  brand: string;
  description: string;
  offer: ObjectId;
  other?: string;
  date: Date;
  clients: Array<ObjectId>;
  creator: ObjectId;
  category: ObjectId;
  type: ObjectId;
}
