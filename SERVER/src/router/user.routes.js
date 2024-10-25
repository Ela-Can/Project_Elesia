import express from "express";

import { getAllUsers, getAllComments, getOneUserById, hideComment, updateComment, updateUserInfo, updateUserStatus, removeUser, getAllDiagnosticByUserId, removeDiagnostic } from "../controllers/user.js";
import withAdminAuth from "../middlewares/withAdminAuth.js";

const router = express.Router();

// Gestion des utilisateurs 

router.get("/list", getAllUsers); // ajouter le middleware qui vérifie le rôle de la personne qui accède à ces données
router.get("/:id", getOneUserById);

router.patch("/update_status/:id", updateUserStatus);
router.patch("/update_information/:id", updateUserInfo);
router.delete("/delete/:id", removeUser);


// Gestion des commentaires sur l'espace personnel (voir l'historique, modifier ou supprimer un commentaire)

router.get("/:id_user/comments/list", getAllComments); 
router.patch("/:id_user/comments/update/:id_product", updateComment); 
router.delete("/:id_user/comments/delete/:id", hideComment);

// Gestion des diagnostics 

router.get("/:id_user/diagnostic/list", getAllDiagnosticByUserId);
router.delete("/:id_user/diagnostic/delete/:id", removeDiagnostic);

export default router;