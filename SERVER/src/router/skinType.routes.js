import express from "express";

import { getAll, create, update, remove } from "../controllers/skinType.js";
import withAdminAuth from "../middlewares/withAdminAuth.js";

const router = express.Router();

router.get("/list", getAll); 

router.post("/create", create);
router.patch("/update/:id", update);
router.delete("/delete/:id", remove);

export default router;