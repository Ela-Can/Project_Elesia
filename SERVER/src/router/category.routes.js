import express from "express";

import {
    getAll,
    create,
    update,
    remove
} from "../controllers/category.js";

import withAdminAuth from "../middlewares/withAdminAuth.js";

const router = express.Router();

// Routes for managing categories

router.get("/list", getAll); 

router.post("/create", withAdminAuth, create);

router.patch("/update/:id", withAdminAuth, update);

router.delete("/delete/:id", withAdminAuth, remove);

export default router;