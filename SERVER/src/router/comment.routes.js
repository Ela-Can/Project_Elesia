import express from "express";
import { getAll, getAllFromProduct, hideCommentAsAdmin } from "../controllers/comment.js";


const router = express.Router();

router.get("/list", getAll);

router.patch("/delete/:id", hideCommentAsAdmin);

router.get("/from-product/:id", getAllFromProduct);


export default router;