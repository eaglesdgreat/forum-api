import { PointsProps } from "../types/interfaces";
import { ThreadItem } from './../entities/ThreadItem';
import { ThreadItemPoint } from "../entities/ThreadItemPoint";
import { User } from '../entities/User';
import { dataSource } from "../datasource";

interface ModelProps {
  message?: string;
  threadItemPoint?: ThreadItemPoint;
}

export const updateThreadItemPointModel =async (payload: PointsProps): Promise<ModelProps> => {
  const { userId, threadItemId, increment} = payload;

  let message = "Failed to increment thread item point";

  const threadItem = await ThreadItem.findOne({ where: { id: threadItemId }, relations: ["user"] });

  if (threadItem!.user!.id === userId ) {
    message = "Error: users cannot increment their own thread item";

    return { message };
  }

  const user = await User.findOne({ where: {id: userId } });

  const existingPoint = await ThreadItemPoint.findOne({
    where: {
      threadItem: { id: threadItemId },
      user: { id: userId },
    },
    relations: ["threadItem"],
  });

  await dataSource.manager.transaction(async (transactionalEntityManager) => {
    if (existingPoint) {
      if (increment) {
        if (existingPoint.isDecrement) {
          console.log("remove decrement");
          await ThreadItemPoint.remove(existingPoint);

          threadItem!.points = Number(threadItem!.points) + 1;
          threadItem!.lastModifiedOn = new Date();
          threadItem!.save();
        }
      } else {
        if (!existingPoint.isDecrement) {
          console.log("remove increment");
          await ThreadItemPoint.remove(existingPoint);

          threadItem!.points = Number(threadItem!.points) - 1;
          threadItem!.lastModifiedOn = new Date();
          threadItem!.save();
        }
      }
    } else {
      await ThreadItemPoint.create({
        threadItem,
        isDecrement: !increment,
        user
      } as any).save();

      if (increment) {
        threadItem!.points = Number(threadItem!.points) + 1;
      } else {
        threadItem!.points = Number(threadItem!.points) - 1;
      }
      threadItem!.lastModifiedOn = new Date();
      threadItem!.save();
    }
  });

  return { message };
}