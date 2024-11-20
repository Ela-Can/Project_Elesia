import express from "express";

import { getAllUsers, getAllComments, getOneUserById, hideComment, updateComment, updateUserInfo, updateUserStatus, removeUser, getAllDiagnosticByUserId, removeDiagnostic } from "../controllers/user.js";
import withAdminAuth from "../middlewares/withAdminAuth.js";
import withAuth from "../middlewares/withAuth.js";

const router = express.Router();

// Gestion des utilisateurs 

router.get("/list", withAdminAuth, getAllUsers); // ajouter le middleware qui vérifie le rôle de la personne qui accède à ces données
router.get("/:id", withAuth, getOneUserById);

router.patch("/update_status/:id", withAdminAuth, updateUserStatus);
router.patch("/update_information/:id", withAuth, updateUserInfo);
router.delete("/delete/:id", withAuth, removeUser);


// Gestion des commentaires sur l'espace personnel (voir l'historique, modifier ou supprimer un commentaire)

router.get("/:id_user/comments/list", withAuth, getAllComments); 
router.patch("/:id_user/comments/update/:id_product", withAuth, updateComment); 
router.patch("/:id_user/comments/delete/:id", withAuth, hideComment);

// Gestion des diagnostics 

router.get("/:id_user/diagnostic/list", withAuth, getAllDiagnosticByUserId);
router.delete("/:id_user/diagnostic/delete/:id", withAuth, removeDiagnostic);

export default router;