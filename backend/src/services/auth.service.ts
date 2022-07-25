import {
  InterfaceService,
  InterfaceEmailRegistered,
  InterfaceAuthLogin,
  InterfaceUserCofirmed,
  InterfaceAuthConfirmUser,
  InterfaceValidToken,
  InterfaceChangedPassword,
} from "../interfaces/system";
import { UserInterface } from "../interfaces/project";
import tokenGenerator from "./token.service";
import jwtGenerator from "../helpers/JWTGenerator";

import User from "../models/user.model";

export async function signup(
  UserData: UserInterface
): Promise<InterfaceService<InterfaceEmailRegistered>> {
  try {
    const { email } = UserData;
    const emailExists = await User.findOne({ email: email });

    if (emailExists) {
      return { error: "email_taken" };
    }

    // save user
    const newUser = new User(UserData);
    newUser.token = await tokenGenerator();
    await newUser.save();

    if (newUser) {
      const token = newUser.token;
      return { result: { id: newUser._id.toString(), token } };
    } else {
      return { error: "register_error" };
    }
    // send message
  } catch (event) {
    throw event;
  }
}

export async function login(
  email: string,
  password: string
): Promise<InterfaceService<InterfaceAuthLogin>> {
  try {
    // Security | user exists
    const user = await User.findOne({ email: email });

    if (!user) {
      return { error: "email_not_exists" };
    }

    // Security | user is confirmed
    if (!user.confirmed) {
      return { error: "user_not_confirmed" };
    }

    // Security | user checkPassword
    if (!(await user.checkPassword(password))) {
      return { error: "invalid_password" };
    }

    if (await user.checkPassword(password)) {
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        lat_name: user.last_name,
        phone: user.phone,
        jwtoken: jwtGenerator(user._id.toString()),
      };
      return { result: { dataUser: data } };
    } else {
      return { error: "invalid_password" };
    }
  } catch (event) {
    throw event;
  }
}

export async function confirmUser(
  token: string
): Promise<InterfaceService<InterfaceUserCofirmed>> {
  try {
    const newUser = await User.findOne({ token: token });

    // Security | token is valid
    if (!newUser) {
      return { error: "invalid_token" };
    }

    if (newUser) {
      // change variables
      newUser.confirmed = true;
      newUser.token = "";

      // save changes
      await newUser.save();
      const message: string = "Confirmation successfully";

      return { result: { confirmation: message } };
    } else {
      return { error: "something_worng" };
    }
  } catch (event) {
    throw event;
  }
}

export async function recoverPassword(
  email: string
): Promise<InterfaceService<InterfaceAuthConfirmUser>> {
  try {
    const user = await User.findOne({ email: email });

    // Security | user exists
    if (!user) {
      return { error: "email_not_exists" };
    } else {
      const token = tokenGenerator();
      const message = "We sent an email with instructions";

      user.token = token;
      await user.save();
      return { result: { confirmation: message, token: token } };
    }
  } catch (event) {
    throw event;
  }
}

export async function checkToken(
  token: string
): Promise<InterfaceService<InterfaceValidToken>> {
  try {
    const validToken = await User.findOne({ token: token });
    // Security | token valid
    if (validToken) {
      const message = "Token is validated";
      return { result: { confirmation: message } };
    } else {
      return { error: "invalid_token" };
    }
  } catch (event) {
    throw event;
  }
}

export async function newPassword(
  token: string,
  password: string
): Promise<InterfaceService<InterfaceChangedPassword>> {
  try {
    // security | token exist
    const userReq = await User.findOne({ token: token });
    if (userReq) {
      userReq.password = password;
      userReq.token = "";
      await userReq.save();
      const message = "New password saved successfully";
      return { result: { confirmation: message } };
    } else {
      return { error: "invalid_token" };
    }
  } catch (error) {
    throw error;
  }
}
