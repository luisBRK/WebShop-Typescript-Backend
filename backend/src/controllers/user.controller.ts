import { Request, Response } from "express";
import { RequestCustom } from "../types";
// import User from "../models/user.model";
// import jwtGenerator from "../helpers/JWTGenerator";

import { AuthService } from "../services";
import sendResponse from "../utils/sendResponse";

const signup = async (req: Request, res: Response) => {
  // try & catch | save user
  try {
    const response = await AuthService.signup(req.body);
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req: Request, res: Response) => {
  // try catch
  try {
    const response = await AuthService.login(req.body.email, req.body.password);

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const confirmUser = async (req: Request, res: Response) => {
  try {
    const response = await AuthService.confirmUser(req.params.token);

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const recoverPassword = async (req: Request, res: Response) => {
  try {
    const response = await AuthService.recoverPassword(req.body.email);

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const checkToken = async (req: Request, res: Response) => {
  try {
    const response = await AuthService.checkToken(req.params.token);
    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const newPassword = async (req: Request, res: Response) => {
  try {
    const response = await AuthService.newPassword(
      req.params.token,
      req.body.password
    );

    sendResponse({ res, response });
  } catch (error) {
    console.log(error);
  }
};

const profile = async (req: RequestCustom, res: Response) => {
  console.log(req.body);
  console.log(req.user);
  const { user } = req;

  res.json(user);
};

export {
  signup,
  login,
  confirmUser,
  recoverPassword,
  checkToken,
  newPassword,
  profile,
};
