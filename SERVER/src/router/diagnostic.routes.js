import express from "express";

import { create } from "../controllers/diagnostic.js";

import withAuth from "../middlewares/withAuth.js";

const router = express.Router();

// Route for creating a diagnostic

router.post("/create", create); // ajouter le middleware

export default router;