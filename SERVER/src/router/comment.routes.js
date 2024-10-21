import express from "express";
import { addComment, getAll, getAllFromProduct } from "../controllers/comment.js";

const router = express.Router();

router.get("/list", getAll);
router.get("/product/:id", getAllFromProduct);


export default router;