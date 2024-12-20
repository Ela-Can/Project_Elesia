import express from "express";

import {
    addCommentToProduct,
    createProduct, getAllProducts,
    getOneProductById,
    removeProduct,
    updateProduct
} from "../controllers/product.js";


import withAdminAuth from "../middlewares/withAdminAuth.js";
import withAuth from "../middlewares/withAuth.js";

import uploadImg from "../middlewares/uploadImg.js";

const router = express.Router();

// Routes for managing products

router.get("/list", getAllProducts);
router.get("/:id", getOneProductById);

router.post("/create/:folder", uploadImg, withAdminAuth, createProduct); 

router.patch("/update/:folder/:id", uploadImg, withAdminAuth,  updateProduct);
router.delete("/delete/:id", withAdminAuth, withAdminAuth, removeProduct);


// Add a comment to a product

router.post("/:id_product/addcomment", withAuth, addCommentToProduct);

export default router;