import express from "express";
import { check_auth, login, logout, register } from "../controllers/auth.js";
import withAuth from "../middlewares/withAuth.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/logout", logout);

router.get("/check-auth", check_auth);

export default router;