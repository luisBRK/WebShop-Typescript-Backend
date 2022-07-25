import { ObjectId } from "mongoose";

export interface OfferInterface {
  _id: ObjectId;
  name: string;
  description: string;
  amount: number;
  creator: ObjectId;
}
