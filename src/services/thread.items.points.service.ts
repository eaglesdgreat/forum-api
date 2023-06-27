import { PointsProps } from "../types/interfaces";
import { QueryOneResult } from "../types/classes";
import { ThreadItemPoint } from "../entities/ThreadItemPoint";
import { updateThreadItemPointModel } from "../models/thread.items.points.model";

export const updateThreadItemPointService = async (payload: PointsProps): Promise<QueryOneResult<ThreadItemPoint>> => {
  const { userId, threadItemId } = payload;

  if (!userId || userId == "0") {
    return { messages: ["User is not authenticated"] };
  }

  if (!threadItemId || threadItemId == "0") {
    return { messages: ["Thread item ID cannot be null"] };
  }

  const point = await updateThreadItemPointModel(payload);
  
  const msg = point.message ? point.message : "Failed to update point.";

  return { messages: [msg] };
}