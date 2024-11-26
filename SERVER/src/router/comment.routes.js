import express from "express";
import { getAllFromProduct, getAllModeratedComments, getAllPendingComments, updateCommentStatus } from "../controllers/comment.js";

import withAdminAuth from "../middlewares/withAdminAuth.js";

const router = express.Router();

router.get("/list/pending", withAdminAuth, getAllPendingComments);

router.get("/list/moderated", withAdminAuth, getAllModeratedComments);

router.get("/from-product/:id", getAllFromProduct);

router.patch("/update/:id", withAdminAuth, updateCommentStatus);

export default router;