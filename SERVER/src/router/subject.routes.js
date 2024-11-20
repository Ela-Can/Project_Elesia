import express from "express";

import { getAll, getAllByStatus, create, update, hideSubject } from "../controllers/subject.js";
import withAdminAuth from "../middlewares/withAdminAuth.js";

const router = express.Router();

router.get("/list", getAll); 
router.get("/list/:subjectStatus", getAllByStatus); 

router.post("/create", withAdminAuth, create);
router.patch("/update/:id", withAdminAuth, update);
router.patch("/delete/:id", withAdminAuth, hideSubject);

export default router;