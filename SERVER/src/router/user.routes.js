import express from "express";

import {
    getAllUsers,
    getAllComments,
    getOneUserById,
    hideComment,
    updateComment,
    updateUserInfo,
    updateUserStatus,
    removeUser,
    getAllDiagnosticByUserId,
    removeDiagnostic
} from "../controllers/user.js";

import withAdminAuth from "../middlewares/withAdminAuth.js";
import withAuth from "../middlewares/withAuth.js";

const router = express.Router();

// Routes for managing users

router.get("/list", withAdminAuth, getAllUsers); 
router.get("/:id", withAuth, getOneUserById);

router.patch("/update_status/:id", withAdminAuth, updateUserStatus);
router.patch("/update_information/:id", withAuth, updateUserInfo);

router.delete("/delete/:id", withAuth, removeUser);


// Routes for managing user comments

router.get("/:id_user/comments/list", withAuth, getAllComments); 

router.patch("/:id_user/comments/update/:id_comment", withAuth, updateComment); 
router.patch("/:id_user/comments/delete/:id_comment", withAuth, hideComment);


// Routes for managing user diagnostics

router.get("/:id_user/diagnostic/list", withAuth, getAllDiagnosticByUserId);

router.delete("/:id_user/diagnostic/delete/:id", withAuth, removeDiagnostic);

export default router;