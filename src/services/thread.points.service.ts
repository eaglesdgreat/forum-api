import { PointsProps } from "../types/interfaces";
import { QueryOneResult } from "../types/classes";
import { ThreadPoint } from "../entities/ThreadPoint";
import { updateThreadPointModel } from "../models/thread.points.model"

export const updateThreadPointService = async (payload: PointsProps): Promise<QueryOneResult<ThreadPoint>> => {
  const { userId, threadId } = payload;

  if (!userId || userId == "0") {
    return { messages: ["User is not authenticated"] };
  }

  if (!threadId || threadId == "0") {
    return { messages: ["Thread ID cannot be null"] };
  }

  const point = await updateThreadPointModel(payload);
  
  const msg = point.message ? point.message : "Failed to update point.";

  return { messages: [msg] };
}