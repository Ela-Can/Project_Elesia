import express from "express";

import uploadImg from "../middlewares/uploadImg.js";
import withAdminAuth from "../middlewares/withAdminAuth.js";
import withAuth from "../middlewares/withAuth.js";
import { addCommentToProduct, createProduct, getAllProducts, getOneProductById, removeProduct, updateProduct } from "../controllers/product.js";


const router = express.Router();

// Gestion des produits

router.get("/list", getAllProducts);
router.get("/:id", getOneProductById);
//router.get("/name/:name", getOneProductById);

router.post("/create/:folder", uploadImg, withAdminAuth, createProduct); // Ajouter le middelware

router.patch("/update/:folder/:id", uploadImg, updateProduct);// Ajouter le middelware
router.delete("/delete/:id", withAdminAuth, removeProduct);

// Ajout d'un commentaire sur la fiche produit

router.post("/:id_product/addcomment", withAuth, addCommentToProduct);


export default router;