import { PointsProps } from "../types/interfaces";
import { Thread } from './../entities/Thread';
import { ThreadPoint } from "../entities/ThreadPoint";
import { User } from '../entities/User';
import { dataSource } from "../datasource";

interface ModelProps {
  message?: string;
  threadPoint?: ThreadPoint;
}

export const updateThreadPointModel = async (payload: PointsProps): Promise<ModelProps> => {
  const { userId, threadId, increment } = payload;

  let message = "Failed to increment thread point";

  const thread = await Thread.findOne({ where: { id: threadId }, relations: ["user"] });

  if (thread!.user!.id === userId) {
    message = "Error: users cannot increment their own thread.";

    return { message };
  }

  const user = await User.findOne({ where: { id: userId } });
  
  const existingPoint = await ThreadPoint.findOne({
    where: {
      thread: { id: threadId },
      user: { id: userId }
    },
    relations: ["thread"],
  });

  await dataSource.manager.transaction(async (transactionalEntityManager) => {
    if (existingPoint) {
      if (increment) {
        if (existingPoint.isDecrement) {
          await ThreadPoint.remove(existingPoint);

          thread!.points = Number(thread!.points) + 1;
          thread!.lastModifiedOn = new Date();
          thread!.save();
        }
      } else {
        if (!existingPoint.isDecrement) {
          await ThreadPoint.remove(existingPoint);

          thread!.points = Number(thread!.points) - 1;
          thread!.lastModifiedOn = new Date();
          thread!.save();
        }
      }
    } else {
      await ThreadPoint.create({
        thread,
        isDecrement: !increment,
        user
      } as any).save();

      if (increment) {
        thread!.points = Number(thread!.points) + 1;
      } else {
        thread!.points = Number(thread!.points) - 1;
      }
      thread!.lastModifiedOn = new Date();
      thread!.save();

      message = `Successfully ${increment ? "incremented" : "decremented"} point`;
    }
  });

  return { message };
}