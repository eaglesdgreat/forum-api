import { AuthProps } from "./../types/interfaces";
import { User } from "./../entities/User";
import bcrypt from "bcryptjs";

const saltRounds = 10;

export const registerModel = async (body: AuthProps): Promise<User> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(body.password, salt);

  const userEntity = await User.create({
    userName: body?.userName,
    email: body.email,
    password: hashPassword,
  }).save();

  return userEntity;
}

export const loginModel = async (userName: string): Promise<User | null> => {
  const user = await User.findOne({ where: { userName } });

  return user;
}

export const currentSessionUserModel = async (id: string): Promise<User | null> => {
  const user = await User.findOne({
    where: { id },
    relations: [
      "threads",
      "threads.threadItems",
      "threadItems",
      "threadItems.thread",
    ],
  });

  return user;
}

export const logoutModel = async (userName: string): Promise<User | null> => {
  const user = await User.findOne({ where: { userName } });

  return user;
}