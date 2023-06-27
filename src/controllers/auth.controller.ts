import {
  loginService,
  logoutService,
  registerService
} from "../services/auth.service";

export const registerController = async (req: any, res: any, next: any) => {
  try {
    const userResult = await registerService(req.body);

    if (userResult && userResult.entity) {
      res.status(200).send(`new user created, userId: ${userResult.entity.id}`);
    } else if (userResult && userResult.messages) {
      res.status(200).send(userResult.messages[0]);
    } else {
      next();
    }
  } catch (e: any) {
    res.status(400).send({ error: e.message});
  }
}

export const loginController = async (req: any, res: any, next: any) => {
  try {
    const userResult = await loginService(req.body)
    console.log(req.session);
    if (userResult && userResult.entity) {
      req.session!.userId = userResult.entity?.id;
      res.status(200).send(`user logged in, userId: ${req.session!.userId}`);
    } else if (userResult && userResult.messages) {
      res.status(200).send(userResult.messages[0]);
    } else {
      next();
    }
  } catch(e: any) {
    res.status(400).send({ error: e.message});
  }
}

export const logoutController = async (req: any, res: any, next: any) => {
  try {
    const userResult = await logoutService(req.body.userName);

    if (userResult) {
      req.session?.destroy((err: any) => {
        if (err) {
          console.log("destroy session failed");
          return;
        }
        console.log("session destroyed", req.session?.userId);
      });
      // req.session!.userId = null;
      res.status(200).send(userResult);
    } else {
      next();
    }
  } catch (e: any) {
    res.status(400).send({ error: e.message});
  }
}

export const sessionController = (req: any, res: any) => {
  req.session!.test = "hello";
  res.send("hello");
}