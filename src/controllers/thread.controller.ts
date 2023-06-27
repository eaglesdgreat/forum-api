import {
  createThreadService,
  getThreadByCategoryIdService,
  getThreadByIdService
} from "../services/thread.service";

export const createThreadController = async (req: any, res: any) => {
  try {
    const payload = {
      userId: req.session!.userId,
      categoryId: req.body.categoryId,
      title: req.body.title,
      body: req.body.body,
    };
  
    const msg = await createThreadService(payload);

    res.status(200).send(msg);
  } catch (e: any) {
    res.status(400).send({ error: e.message});
  }
}

export const getThreadByIdController = async (req: any, res: any, next: any) => {
  try {
    const threadResult = await getThreadByIdService(req.params.id);

    if (threadResult?.messages) {
      res.status(404).send(threadResult.messages[0]);
    } else if (threadResult?.entity) {
      res.status(200).send(threadResult.entity);
    } else {
      next();
    }

  } catch (e: any) {
    res.status(400).send({ error: e.message});
  }
}

export const getThreadByCategoryIdController = async (req: any, res: any, next: any) => {
  try {
    console.log(req.session)
    const threadResult = await getThreadByCategoryIdService(req.params.categoryId);

    if (threadResult?.messages) {
      res.status(404).send(threadResult.messages[0]);
    } else if (threadResult?.entities) {
      res.status(200).send(threadResult.entities);
    } else {
      next();
    }
  } catch (e: any) {
    res.status(400).send({ error: e.message});
  }
}