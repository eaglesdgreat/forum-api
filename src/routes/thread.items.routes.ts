import {
  createThreadItemController,
  getThreadItemsByThreadIdController
} from '../controllers/thread.items.controller';

import express from "express";

const router = express.Router();

// Thread Items Routes
router.route("/threads/items").post(createThreadItemController);
router.route("/threads/items/:threadId").get(getThreadItemsByThreadIdController);

export default router;
