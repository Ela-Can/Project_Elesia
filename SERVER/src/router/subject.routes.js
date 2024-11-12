import express from "express";

import { getAll, getAllByStatus, create, update, hideSubject } from "../controllers/subject.js";
import withAdminAuth from "../middlewares/withAdminAuth.js";

const router = express.Router();

router.get("/list", getAll); 
router.get("/list/:subjectStatus", getAllByStatus); 

router.post("/create", create);
router.patch("/update/:id", update);
router.patch("/delete/:id", hideSubject);

export default router;