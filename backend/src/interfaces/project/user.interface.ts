import { ObjectId } from "mongoose";

export interface UserInterface {
  // _id: string;
  _id: ObjectId;
  name: string;
  last_name: string;
  phone: number;
  email: string;
  password: string;
  token: string;
  confirmed: boolean;
}

export interface UserInterfaceMethods {
  checkPassword(formPassword: string): Promise<boolean>;
}
