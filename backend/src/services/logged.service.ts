import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { Response, NextFunction } from "express";
import { RequestCustom } from "../types";
import { UserInterface } from "../interfaces/project";
import { DecodedInterface } from "../interfaces/system/decodedid.interface";

const checkAuthLoggin = async (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  let jwtoken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      jwtoken = req.headers.authorization.split(" ")[1];
      const decoded: DecodedInterface = jwt.verify(
        jwtoken,
        process.env.JWT_SECRET as string
      ) as DecodedInterface;

      // console.log(decoded);

      const userData = (await User.findById(decoded.id).select(
        "-password -confirmed -token -createdAt -updatedAt -__v"
      )) as UserInterface;
      req.user = userData;
      // console.log(req.user);
    } catch (error) {
      return res
        .status(404)
        .json({ message: "An Error has courred, your session is invalid" });
    }
  }

  if (!jwtoken) {
    const error = new Error("Invalid Token");
    res.status(401).json({ message: error.message });
  }

  return next();
};

export default checkAuthLoggin;
