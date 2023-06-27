import { createThreadItemService, getThreadItemsByThreadIdService } from "../services/thread.items.service";

export const createThreadItemController = async (req: any, res:any) => {
  try {
    const payload = {
      userId: req.body.userId,
      threadId: req.body.threadId,
      body: req.body.body, 
    }

    const msg = await createThreadItemService(payload);

    res.status(200).send(msg);
  } catch (e: any) {
    res.status(400).send({ error: e.message});
  }
}

export const getThreadItemsByThreadIdController = async (req: any, res: any, next: any) => {
  try {
    const threadItemResult = await getThreadItemsByThreadIdService(req.params.threadId);

    if (threadItemResult?.messages) {
      res.status(404).send(threadItemResult.messages[0]);
    } else if (threadItemResult?.entities) {
      res.status(200).send(threadItemResult.entities);
    } else {
      next();
    }
  } catch (e: any) {
    res.status(400).send({ error: e.message});
  }
}