import express from "express";
import { create, getAllByStatus, updateStatus } from "../controllers/contact.js";

const router = express.Router();

router.get("/list/:status", getAllByStatus);

router.post("/create", create);
router.patch("/update/:id", updateStatus)

export default router;