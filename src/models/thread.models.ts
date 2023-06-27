import { ThreadCategoryProps, ThreadProps } from "../types/interfaces";

import { Thread } from './../entities/Thread';
import { ThreadCategory } from '../entities/ThreadCategory';
import { User } from '../entities/User';

interface ModelProps {
  thread?: Thread | null;
  message?: string
  threads?: Array<Thread> | [];
  category?: ThreadCategory | null;
  categories?: Array<ThreadCategory> | [];
}

export const createThreadModel = async (payload: ThreadProps): Promise<ModelProps> => {
  const { userId, title, body, categoryId } = payload;

  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return {
      message: "User not logged in.",
    }
  }

  const category = await ThreadCategory.findOne({ where: { id: categoryId } });
  if (!category){
    return {
      message: "Category not found.",
    }
  }

  const thread = await Thread.create({
    title,
    body,
    user,
    category,
  }).save();

  return {
    thread,
  }
}

export const getThreadByIdModel = async (id: string): Promise<ModelProps> => {
  const thread = await Thread.findOne({ where: {id } });

  return {
    thread
  };
}

export const createThreadCategoryModel = async (payload: ThreadCategoryProps): Promise<ModelProps> => {
  const { name, description } = payload;

  const category = await ThreadCategory.create({
    name,
    description: description ? description : "",
  }).save();

  return {
    category,
  }
}

export const getThreadByCategoryIdModel = async(categoryId: string): Promise<ModelProps> => {
  const threadsByCategory = await Thread.createQueryBuilder("thread")
    .where(`thread."categoryId" = :categoryId`, { categoryId })
    .leftJoinAndSelect("thread.category", "category")
    .orderBy("thread.createdOn", "DESC")
    .getMany();

  return {
    threads: threadsByCategory,
  }
}

export const getThreadCategoriesModel = async(): Promise<ModelProps> => {
  const categories = await ThreadCategory.find();

  return {
    categories,
  }
}