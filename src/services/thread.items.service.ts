import { createThreadItemModel, getThreadItemsByThreadIdModel } from "../models/thread.items.model";

import { QueryArrayResult } from "../types/classes";
import { ThreadItem } from  "../entities/ThreadItem";
import { ThreadItemProps } from "../types/interfaces";
import { isThreadBodyValid } from "../helpers/thread-validator/ThreadValidators";

export const createThreadItemService = async (payload: ThreadItemProps): Promise<QueryArrayResult<ThreadItem>> => {
  const { body } = payload;

  const bodyMsg = isThreadBodyValid(body);

  if (bodyMsg) {
    return {
      messages: [bodyMsg],
    };
  };

  const threadItem = await createThreadItemModel(payload);

  if (threadItem.message) {
    return {
      messages: [threadItem.message],
    }
  }

  if (!threadItem) {
    return {
      messages: ["Failed to create thread item."],
    }
  }

  return {
    messages: ["Thread item created successfully."],
  }
}

export const getThreadItemsByThreadIdService = async(threadId: string): Promise<QueryArrayResult<ThreadItem>> => {
  const { threadItems } = await getThreadItemsByThreadIdModel(threadId);

  if (!threadItems?.length) {
    return {
      messages: ["ThreadItems of thread not found."],
    }
  }

  return {
    entities: threadItems,
  }
}
