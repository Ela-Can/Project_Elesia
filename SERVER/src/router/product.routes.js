import express from "express";

import uploadImg from "../middlewares/uploadImg.js";
import withAdminAuth from "../middlewares/withAdminAuth.js";
import { addCommentToProduct, createProduct, getAllProducts, getOneProductById, removeProduct, updateProduct } from "../controllers/product.js";


const router = express.Router();

// Gestion des produits

router.get("/list", getAllProducts);
router.get("/:id", getOneProductById);
router.get("/name/:name", getOneProductById);

router.post("/create/:folder", uploadImg, createProduct);

router.patch("/update/:folder/:id", uploadImg, updateProduct);
router.delete("/delete/:id", removeProduct);

// Ajout d'un commentaire sur la fiche produit

router.post("/:id_product/addcomment", addCommentToProduct);


export default router;