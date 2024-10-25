import express from "express";
import { getAll, getAllFromProduct } from "../controllers/comment.js";

const router = express.Router();

router.get("/list", getAll);


export default router;