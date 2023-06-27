import {
  createThreadController,
  getThreadByCategoryIdController,
  getThreadByIdController
} from '../controllers/thread.controller';

import express from "express";

const router = express.Router();

// Thread Routes
router.route("/threads").post(createThreadController);
router.route("/threads/:id").get(getThreadByIdController);
router.route("/threads/category/:categoryId").get(getThreadByCategoryIdController);

export default router;
