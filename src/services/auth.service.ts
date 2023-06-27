import {
  currentSessionUserModel,
  loginModel,
  logoutModel,
  registerModel
} from '../models/auth.models';

import { AuthProps } from "./../types/interfaces";
import { QueryOneResult } from "./../types/classes"
import { User } from "./../entities/User";
import bcrypt from "bcryptjs";
import { isEmailValidate } from "../helpers/validators/EmailValidator";
import { isPasswordValidate } from "../helpers/validators/PasswordValidator";
import { userNotFound } from '../helpers/validators/UserNotFound';

export const registerService = async (body: AuthProps): Promise<QueryOneResult<User>> => {
  const result = isPasswordValidate(body.password);

  if (!result.isValid) {
    return {
      messages: ["Passwords must have min length 8, 1 upper character, 1 number, and 1 symbol"],
    }
  }

  const trimmedEmail = body.email.trim().toLowerCase();
  const emailErrorMsg = isEmailValidate(trimmedEmail);

  if (emailErrorMsg) {
    return {
      messages: [emailErrorMsg],
    }
  }

  const payload = {
    userName: body.userName,
    email: trimmedEmail,
    password: body.password,
  }

  const user = await registerModel(payload);

  user.password = ""; // blank out for security

  return {
    entity: user,
  };
}

export const loginService = async (body: { userName: string; password: string }): Promise<QueryOneResult<User>> => {
  const user = await loginModel(body.userName);

  if (!user) {
    return {
      messages: ["User not found"],
    }
  }

  if (!user.confirmed) {
    return {
      messages: ["User has not confirmed their registration email yet."],
    }
  }

  const passwordMatch = await bcrypt.compare(body.password, user.password);

  if (!passwordMatch) {
    return {
      messages: ["UserName or Password is invalid."]
    }
  }

  return {
    entity: user,
  }
}

export const currentSessionUserService = async (id: string): Promise<QueryOneResult<User>> => {
  const user = await currentSessionUserModel(id);

  if (!user) {
    return { messages: ["User not found"] }
  }

  if (!user.confirmed) {
    return { messages: ["User has not confirmed their registration email yet."] }
  }

  user.password = "";

  return { entity: user };
}

export const logoutService = async (userName: string): Promise<string> => {
  const user = await logoutModel(userName);

  if (!user) {
    return userNotFound(userName);
  }

  return "User logged off.";
}