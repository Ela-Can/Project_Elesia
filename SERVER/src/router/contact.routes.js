import express from "express";
import { create, getAllFinishedRequests, getAllPendingRequests, updateStatus } from "../controllers/contact.js";

import withAdminAuth from "../middlewares/withAdminAuth.js";

const router = express.Router();

router.get("/list/pending", withAdminAuth, getAllPendingRequests);

router.get("/list/finished", withAdminAuth, getAllFinishedRequests);

router.post("/create", create);

router.patch("/update/:id", withAdminAuth, updateStatus)

export default router;