import fs from 'fs';
import path from 'path';

import Product from "../model/Product.js";

const getAllProducts = async (req, res) => {
    try {
        const [response] = await Product.findAllProducts();
        console.log("Données envoyées :", response);
        res.status(200).json(response);
    } catch (err) {
        console.error("Erreur lors de la récupération des produits :", err);
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
        
        const name = req.body.name.trim();
        const description = req.body.description.trim();
        const ingredients = req.body.ingredients.trim();
        const howToUse = req.body.howToUse.trim();
        const precautions = req.body.precautions.trim();
        const useDuration = req.body.useDuration.trim();
        const alt = req.body.alt.trim();

        const image = req.body.image;
        const id_skinType = req.body.id_skinType;
        const id_skinConcern = req.body.id_skinConcern;
        const adaptedToSensitiveSkin = req.body.adaptedToSensitiveSkin;
        const protectsFromPollution = req.body.protectsFromPollution;
        const protectsFromSun = req.body.protectsFromSun;
        const compatibleWithPregOrBreastfeed = req.body.compatibleWithPregOrBreastfeed;
        const id_category = req.body.id_category;
        

        if (
            !name || !description || !ingredients || !howToUse || 
            !precautions || !useDuration || !alt || !image
        ) {
            return res.status(400).json({ msg: "Tous les champs requis doivent être remplis." });
        }

        if (name.length > 100) {
            return res.status(400).json({ msg: "Le nom du produit ne peut pas dépasser 100 caractères." });
        }
        if (description.length > 500) {
            return res.status(400).json({ msg: "La description ne peut pas dépasser 1000 caractères." });
        }
        if (ingredients.length > 500) {
            return res.status(400).json({ msg: "Les ingrédients ne peuvent pas dépasser 500 caractères." });
        }
        if (howToUse.length > 150) {
            return res.status(400).json({ msg: "Les instructions d'utilisation ne peuvent pas dépasser 500 caractères." });
        }
        if (precautions.length > 255) {
            return res.status(400).json({ msg: "Les précautions ne peuvent pas dépasser 500 caractères." });
        }
        if (useDuration.length > 100) {
            return res.status(400).json({ msg: "La durée d'utilisation ne peut pas dépasser 100 caractères." });
        }
        if (alt.length > 255) {
            return res.status(400).json({ msg: "Le texte alternatif de l'image ne peut pas dépasser 150 caractères." });
        }

        // faire le reste ...

        const [existingProduct] = await Product.findAllProducts();

        for (let product of existingProduct) {
            if (req.body.name.trim() === product.name) {
                return res.status(400).json({ msg: "Un produit avec ce même nom existe déjà." });
            }
        }
        
        const datas = {
            name,
            description,
            ingredients,
            howToUse,
            precautions,
            useDuration,
            image,
            alt,
            id_skinType,
            id_skinConcern,
            adaptedToSensitiveSkin,
            protectsFromPollution,
            protectsFromSun,
            compatibleWithPregOrBreastfeed,
            id_category,
        };

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

        const [existingProduct] = await Product.findAllProducts();

        for (let product of existingProduct) {
            if (req.body.name.trim() === product.name) {
                return res.status(400).json({ msg: "Un produit avec ce même nom existe déjà." });
            }
        }

        const [product] = await Product.findOneProductById(req.params.id);

        const datas = [
            req.body.name.trim(),
            req.body.description.trim(),
            req.body.ingredients.trim(),
            req.body.howToUse.trim(),
            req.body.precautions.trim(),
            req.body.useDuration.trim(),
            req.body.image,
            req.body.alt.trim(),
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
        const title = req.body.title.trim();
        const content = req.body.content.trim();

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