import fs from 'fs';
import path from 'path';

import Product from "../model/Product.js";
//import uploadImg from '../utils/uploadImg.js';

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
        //if (!response.length) {
        //    res.status(404).json({ msg: "Product not found" });
        //    return;
        //}
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

/*const getOneProductByName = async (req, res) => {
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
};*/

const createProduct = async (req, res) => {

    try {
        const {
            name,
            description,
            ingredients,
            howToUse,
            precautions,
            useDuration,
            packaging,
            alt,
            id_skinType,
            id_skinConcern,
            id_category,
            adaptedToSensitiveSkin,
            protectsFromPollution,
            protectsFromSun,
            compatibleWithPregOrBreastfeed,
            isOnline,
        } = req.body;

        const image = req.body.image || null;

        /*if (
            !name || !description || !ingredients || !howToUse || 
            !precautions || !useDuration || !alt || !imageUrl
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
        if (packaging.length > 500) {
            return res.status(400).json({ msg: "Le packaging ne peut pas dépasser 100 caractères." });
        }
        if (alt.length > 255) {
            return res.status(400).json({ msg: "Le texte alternatif de l'image ne peut pas dépasser 150 caractères." });
        }*/

        // faire le reste ...

        const datas = {
            name,
            description,
            ingredients,
            howToUse,
            useDuration,
            precautions,
            packaging,
            alt,
            isOnline: parseInt(isOnline, 10),
            id_skinType: parseInt(id_skinType, 10),
            id_skinConcern: parseInt(id_skinConcern, 10),
            id_category: parseInt(id_category, 10),
            adaptedToSensitiveSkin: parseInt(adaptedToSensitiveSkin, 10),
            protectsFromPollution: parseInt(protectsFromPollution, 10),
            protectsFromSun: parseInt(protectsFromSun, 10),
            compatibleWithPregOrBreastfeed: parseInt(compatibleWithPregOrBreastfeed, 10),
            image: req.body.image
        };

        const [response] = await Product.createProduct(datas);
        res.json({ msg: "Product Created", id: response.insertId });

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {

        const {
            name,
            description,
            ingredients,
            howToUse,
            useDuration,
            precautions,
            packaging,
            alt,
            id_skinType,
            id_skinConcern,
            id_category,
            adaptedToSensitiveSkin,
            protectsFromPollution,
            protectsFromSun,
            compatibleWithPregOrBreastfeed,
            isOnline,
            image,
        } = req.body;

        /*const [existingProduct] = await Product.findAllProducts();

        for (let product of existingProduct) {
            if (req.body.name === product.name) {
                return res.status(400).json({ msg: "Un produit avec ce même nom existe déjà." });
            }
        }*/

        const [product] = await Product.findOneProductById(req.params.id);

        /*
        if (!datas) {
            return res.status(400).json({ msg: "Les champs obligatoires sont manquants." });
        }*/
        
        if (!product || product.length === 0) {
            return res.status(404).json({ msg: "Produit introuvable." });
        }

        
        let newImagePath = product[0].image;
        if (req.body.image) {
            newImagePath = req.body.image;
        }

        /*if (req.files.image) {
            const imageFile = req.files.image;
            const uploadPath = path.join(process.cwd(), 'public', 'img', 'productImg', imageFile.name);

            try {
                await imageFile.mv(uploadPath); 
                newImagePath = `/img/productImg/${imageFile.name}`;
            } catch (err) {
                console.error("Erreur lors de l'upload de la nouvelle image :", err);
                return res.status(500).json({ msg: "Erreur lors de l'upload de la nouvelle image." });
            }
        }*/

         const datas = [
            name,
            description,
            ingredients,
            howToUse,
            useDuration,
            precautions,
            packaging,
            image || newImagePath,
            alt,
            parseInt(id_skinType, 10),
            parseInt(id_skinConcern, 10),
            parseInt(adaptedToSensitiveSkin, 10),
            parseInt(protectsFromPollution, 10),
            parseInt(protectsFromSun, 10),
            parseInt(compatibleWithPregOrBreastfeed, 10),
            parseInt(id_category, 10),
            parseInt(isOnline, 10),
            parseInt(req.params.id, 10), 
         ];
        
        const [response] = await Product.updateProduct(datas);

        if (!response.affectedRows) {
            res.status(404).json({ msg: "Product not updated" });
            return;
        }

        if (req.files && req.files.image && product[0].image) {

            const oldImagePath = path.join(process.cwd(), 'public', product[0].image);

            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    res.status(500).json({ msg: err.message });
                }  
            });
        }
        res.status(200).json({ msg: "Produit mis à jour avec succès.", id: req.params.id });
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

        if (!title || !content) {
            return res.status(400).json({ msg: "Titre et contenu sont obligatoires." });
        }

        if (title.length > 100 || content.length > 255) {
            return res.status(400).json({ msg: "Titre ou contenu trop long." });
        }

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


export { getAllProducts, getOneProductById, createProduct, updateProduct, removeProduct, addCommentToProduct };