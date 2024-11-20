import express from "express";
import { create } from "../controllers/diagnostic.js";

import withAuth from "../middlewares/withAuth.js";

const router = express.Router();

router.post("/create", create); /// ajouter le middleware

export default router;