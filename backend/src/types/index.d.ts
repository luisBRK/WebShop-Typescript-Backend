import { UserInterface } from "../interfaces/project";
import { Request } from "express";

// declare global {
//   namespace Express {
//     export interface Request {
//       user?: UserInterface;
//     }
//   }
// }
export interface RequestCustom extends Request {
  user?: UserInterface;
}
