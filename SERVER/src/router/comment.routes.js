import express from "express";
import { getAll, getAllFromProduct } from "../controllers/comment.js";

const router = express.Router();

router.get("/list", getAll);
router.get("/from-product/:id", getAllFromProduct);


export default router;