import { Request, Response } from "express";

export interface GqlContext {
  req: Request;
  res: Response;
};

export interface AuthProps {
  userName: string;
  email: string;
  password: string;
}

export interface ThreadProps {
  userId: string;
  categoryId: string;
  title: string;
  body: string;
}

export interface ThreadItemProps {
  userId: string | undefined | null;
  threadId: string;
  body: string;
}

export interface ThreadCategoryProps {
  name: string;
  description?: string | null;
}

export interface PointsProps<> {
  userId: string;
  threadId?: string;
  threadItemId?: string;
  increment: boolean;
}