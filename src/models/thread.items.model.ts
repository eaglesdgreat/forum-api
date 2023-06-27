import { Thread } from "../entities/Thread";
import { ThreadItem } from "../entities/ThreadItem";
import { ThreadItemProps } from "../types/interfaces";
import { User } from "../entities/User";

interface ModelProps {
  threadItem?: ThreadItem | null;
  message?: string
  threadItems?: Array<ThreadItem> | [];
}

export const createThreadItemModel = async(payload: ThreadItemProps): Promise<ModelProps> => {
  const { userId, threadId, body } = payload;

  if (!userId) {
    return {
      message: "User not logged in.",
    }
  }

  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    return {
      message: "User not found",
    }
  }

  const thread = await Thread.findOne({ where: { id: threadId } });

  if (!thread) {
    return {
      message: "Thread not found."
    }
  }

  const threadItem = await ThreadItem.create({ body, user, thread }).save();

  return {
    threadItem,
  }
}

export const getThreadItemsByThreadIdModel = async (threadId: string): Promise<ModelProps> => {
  const threadItems = await ThreadItem.createQueryBuilder("ti")
    .where(`ti."threadId" = :threadId`, {threadId})
    .leftJoinAndSelect("ti.thread", "thread")
    .orderBy("ti.createdOn", "DESC")
    .getMany();

  return {
    threadItems,
  }
}