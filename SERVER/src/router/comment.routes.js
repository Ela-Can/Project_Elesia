import express from "express";
import { getAll, getAllFromProduct, hideCommentAsAdmin } from "../controllers/comment.js";

import withAdminAuth from "../middlewares/withAdminAuth.js";

const router = express.Router();

router.get("/list", getAll);

router.patch("/delete/:id", withAdminAuth, hideCommentAsAdmin);

router.get("/from-product/:id", getAllFromProduct);


export default router;