import express from "express";

import {
    check_auth,
    login,
    logout,
    register
} from "../controllers/auth.js";

import withAuth from "../middlewares/withAuth.js";

const router = express.Router();

// Routes for authentication

router.get("/check-auth", check_auth);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", withAuth, logout);

export default router;