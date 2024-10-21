import fs from 'fs';
import path from 'path';

import Product from "../model/Product.js";

const getAllProducts = async (req, res) => {
    try {
        const [response] = await Product.findAllProducts();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const getOneProductById = async (req, res) => {
    try {
        const [response] = await Product.findOneProductById(req.params.id);
        if (!response.length) {
            res.status(404).json({ msg: "Product not found" });
            return;
        }
        res.json(response[0]);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const getOneProductByName = async (req, res) => {
    try {
        const [response] = await Product.findOneProductByName(req.params.name);
        if (!response.length) {
            res.status(404).json({ msg: "Product not found" });
            return;
        }
        res.json(response[0]);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const createProduct = async (req, res) => {
    try {

        const [existingProduct] = await Product.findAllProducts();

        for (let product of existingProduct) {
            if (req.body.name.trim() === product.name) {
                return res.status(400).json({ msg: "Un produit avec ce même nom existe déjà." });
            }
        }
        
        const datas = {
            name : req.body.name,
            description : req.body.description,
            ingredients : req.body.ingredients,
            howToUse : req.body.howToUse,
            precautions : req.body.precautions,
            useDuration : req.body.useDuration,
            image : req.body.image,
            alt : req.body.alt,
            id_skinType : req.body.id_skinType, 
            id_skinConcern : req.body.id_skinConcern, 
            adaptedToSensitiveSkin : req.body.adaptedToSensitiveSkin, 
            protectsFromPollution : req.body.protectsFromPollution, 
            protectsFromSun : req.body.protectsFromSun, 
            compatibleWithPregOrBreastfeed: req.body.compatibleWithPregOrBreastfeed, 
            id_category : req.body.id_category,
        }

        console.log(req.body);
        const [response] = await Product.createProduct(datas);
        res.json({ msg: "Product Created", id: response.insertId });
    } catch (err) {
        console.error('Erreur SQL:', err.message);
        res.status(500).json({ msg: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {

        const [product] = await Product.findOneProductById(req.params.id);

        const datas = [
            req.body.name,
            req.body.description,
            req.body.ingredients,
            req.body.howToUse,
            req.body.precautions,
            req.body.useDuration,
            req.body.image,
            req.body.alt,
            req.body.id_skinType,
            req.body.id_skinConcern,
            req.body.adaptedToSensitiveSkin,
            req.body.protectsFromPollution,
            req.body.protectsFromSun,
            req.body.compatibleWithPregOrBreastfeed,
            req.body.id_category,
            req.body.isOnline,
            req.params.id
        ];

        const [response] = await Product.updateProduct(datas);

        if (!response.affectedRows) {
            res.status(404).json({ msg: "Product not updated" });
            return;
        }

        const productImage = product[0].image;

        const imagePath = path.join(process.cwd(), 'public', productImage);

        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Erreur lors de la suppression de l'image :", err);
                return res.status(200).json({ msg: "impossible de supprimer l'ancienne image." });
            } else {
                return res.status(200).json({ msg: "ancienne image supprimée et produit mis à jour !" });
            }
        });

        //res.json({ msg: "Product Updated", id: req.params.id });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const removeProduct = async (req, res) => {
    try {
        const [product] = await Product.findOneProductById(req.params.id);
        
        const [response] = await Product.removeProduct(req.params.id);

        if (!response.affectedRows) {
            res.status(404).json({ msg: "Product not deleted" });
            return;
        }

        const productImage = product[0].image;

        const imagePath = path.join(process.cwd(), 'public', productImage);

        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Erreur lors de la suppression de l'image :", err);
                return res.status(200).json({ msg: "Produit supprimé, mais impossible de supprimer l'image." });
            } else {
                return res.status(200).json({ msg: "Produit et image supprimés avec succès !" });
            }
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Ajout d'un commentaire 

const addCommentToProduct = async (req, res) => {
    try {
        const { title, content } = req.body;

        console.log("ID du produit:", req.params.id_product);
        console.log("Données reçues (body):", req.body);
        console.log("Session data:", req.session);

        if (!req.session.user) {
            return res.status(401).json({ msg: "Vous devez être connecté pour ajouter un commentaire." });
        }

        const id_user = parseInt(req.session.user.id);
        const id_product = parseInt(req.params.id_product);

        const [result] = await Product.addCommentToProduct(title, content, id_user, id_product);
        if (result.affectedRows === 0)
            throw new Error("Impossible d'ajouter le commentaire");
        res.status(201).json({ msg: "Votre commentaire a bien été envoyé !" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}


export { getAllProducts, getOneProductById, getOneProductByName, createProduct, updateProduct, removeProduct, addCommentToProduct };