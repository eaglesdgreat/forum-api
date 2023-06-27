import { QueryArrayResult, QueryOneResult } from "../types/classes";
import { ThreadCategoryProps, ThreadProps } from "../types/interfaces";
import {
  createThreadCategoryModel,
  createThreadModel,
  getThreadByCategoryIdModel,
  getThreadByIdModel,
  getThreadCategoriesModel,
} from "../models/thread.models";
import { isThreadBodyValid, isThreadTitleValid } from "../helpers/thread-validator/ThreadValidators";

import { Thread } from "../entities/Thread";
import { ThreadCategory } from "../entities/ThreadCategory";

export const createThreadService = async (payload: ThreadProps): Promise<QueryArrayResult<Thread>> => {
  const { title, body } = payload;

  const titleMsg = isThreadTitleValid(title);
  if (titleMsg) {
    return {
      messages: [titleMsg],
    };
  };

  const bodyMsg = isThreadBodyValid(body);
  if (bodyMsg) {
    return {
      messages: [bodyMsg],
    };
  };

  const thread = await createThreadModel(payload);

  if (thread.message) {
    return {
      messages: [thread.message],
    }
  }

  if (!thread) {
    return {
      messages: ["Failed to create thread."],
    }
  }

  return {
    messages: ["Thread created successfully."],
  }
}

export const getThreadByIdService = async (id: string): Promise<QueryOneResult<Thread>> => {
  const { thread } = await getThreadByIdModel(id);

  if (!thread) {
    return {
      messages: ["Thread not found."],
    }
  }

  return {
    entity: thread,
  }
}

export const createThreadCategoryService = async (payload: ThreadCategoryProps): Promise<QueryArrayResult<ThreadCategory>> => {
  const category = await createThreadCategoryModel(payload);

  if (!category) {
    return {
      messages: ["Failed to create thread category."],
    }
  }

  return {
    messages: ["Thread category created successfully."],
  }
}

export const getThreadByCategoryIdService = async (categoryId: string): Promise<QueryArrayResult<Thread>> => {
  const { threads } = await getThreadByCategoryIdModel(categoryId);

  if (!threads?.length) {
    return {
      messages: ["Threads of category not found."],
    }
  }

  return {
    entities: threads,
  }
}

export const getThreadCategoriesService = async (): Promise<QueryArrayResult<ThreadCategory>> => {
  const { categories } = await getThreadCategoriesModel();

  if (!categories?.length) {
    return {
      messages: ["No categories found."],
    }
  }

  return {
    entities: categories,
  }
} 