import express from "express";
import { getAll, getAllFromProduct, hideComment } from "../controllers/comment.js";


const router = express.Router();

router.get("/list", getAll);

router.patch("/delete/:id", hideComment);

router.get("/from-product/:id", getAllFromProduct);


export default router;