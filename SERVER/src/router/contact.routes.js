import express from "express";
import { create, getAllFinishedRequests, getAllPendingRequests, updateStatus } from "../controllers/contact.js";

const router = express.Router();

router.get("/list/pending", getAllPendingRequests);

router.get("/list/finished", getAllFinishedRequests);

router.post("/create", create);

router.patch("/update/:id", updateStatus)

export default router;