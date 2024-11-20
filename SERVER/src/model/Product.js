import pool from "../config/db.js";

class Product {

    static async findAllProducts() {
        const SELECT_ALL = 
            `SELECT 
                product.id,
                name,
                description,
                ingredients,
                howToUse,
                precautions,
                useDuration,
                packaging,
                image,
                alt,
                id_skinType AS skinType,
                id_skinConcern AS skinConcern,
                adaptedToSensitiveSkin AS adaptedToSensitiveSkin_value,
                CASE
                    WHEN adaptedToSensitiveSkin = 1 THEN 'Produit adapté aux peaux sensibles'
                    ELSE 'Produit non adapté aux peaux sensibles'
                END AS adaptedToSensitiveSkin_label,
                protectsFromPollution AS protectsFromPollution_value,
                CASE
                    WHEN protectsFromPollution = 1 THEN 'Produit protégeant de la pollution'
                    ELSE 'Produit ne protégeant pas de la pollution'
                END AS protectsFromPollution_label,
                protectsFromSun AS protectsFromSun_value,
                CASE
                    WHEN protectsFromSun = 1 THEN 'Produit protégeant du soleil'
                    ELSE 'Produit ne protégeant pas du soleil'
                END AS protectsFromSun_label,
                compatibleWithPregOrBreastfeed AS compatibleWithPregOrBreastfeed_value,
                CASE
                    WHEN compatibleWithPregOrBreastfeed = 1 THEN "Produit compatible avec la grossesse et l'allaitement"
                    ELSE "Produit pas compatible avec la grossesse et l'allaitement"
                END AS compatibleWithPregOrBreastfeed_label,
                isOnline AS isOnline_value,
                CASE
                    WHEN isOnline = 1 THEN 'Produit visible sur le site'
                    ELSE 'Produit invisible sur le site'
                END AS isOnline_label,
                id_category AS category
            FROM product
            JOIN category ON product.id_category = category.id
            LEFT JOIN skinType ON product.id_skinType = skinType.id
            LEFT JOIN skinConcern ON product.id_skinConcern = skinConcern.id`;
        
        return await pool.query(SELECT_ALL);
    }

    static async findOneProductById(id) {
        const SELECT_ONE =
            `SELECT
                product.id,
                name,
                description,
                ingredients,
                howToUse,
                precautions,
                useDuration,
                packaging,
                image,
                alt,
                id_skinType AS skinType,
                id_skinConcern AS skinConcern,
                CASE
                    WHEN adaptedToSensitiveSkin = 1 THEN 'Produit adapté aux peaux sensibles'
                    ELSE 'Produit non adapté aux peaux sensibles'
                END AS adaptedToSensitiveSkin,
                CASE
                    WHEN protectsFromPollution = 1 THEN 'Produit protégeant de la pollution'
                    ELSE 'Produit ne protégeant pas de la pollution'
                END AS protectsFromPollution,
                CASE
                    WHEN protectsFromSun = 1 THEN 'Produit protégeant du soleil'
                    ELSE 'Produit ne protégeant pas du soleil'
                END AS protectsFromSun,
                CASE
                    WHEN compatibleWithPregOrBreastfeed = 1 THEN "Produit compatible avec la grossesse et l'allaitement"
                    ELSE "Produit pas compatible avec la grossesse et l'allaitement"
                END AS compatibleWithPregOrBreastfeed,
                CASE
                    WHEN isOnline = 1 THEN 'Produit visible sur le site'
                    ELSE 'Produit invisible sur le site'
                END AS isOnline,
                id_category AS category
            FROM product
            JOIN category ON product.id_category = category.id
            LEFT JOIN skinType ON product.id_skinType = skinType.id
            LEFT JOIN skinConcern ON product.id_skinConcern = skinConcern.id
            WHERE product.id = ?`;
        return await pool.query(SELECT_ONE, [id]);
    }

    static async findOneProductByName(name) {
        const SELECT_ONE = `
            SELECT
                product.id,
                name,
                description,
                ingredients,
                howToUse,
                precautions,
                useDuration,
                packaging,
                image,
                alt,
                id_skinType AS skinType,
                id_skinConcern AS skinConcern,
                CASE
                    WHEN adaptedToSensitiveSkin = 1 THEN 'Produit adapté aux peaux sensibles'
                    ELSE 'Produit non adapté aux peaux sensibles'
                END AS adaptedToSensitiveSkin,
                CASE
                    WHEN protectsFromPollution = 1 THEN 'Produit protégeant de la pollution'
                    ELSE 'Produit ne protégeant pas de la pollution'
                END AS protectsFromPollution,
                CASE
                    WHEN protectsFromSun = 1 THEN 'Produit protégeant du soleil'
                    ELSE 'Produit ne protégeant pas du soleil'
                END AS protectsFromSun,
                CASE
                    WHEN compatibleWithPregOrBreastfeed = 1 THEN "Produit compatible avec la grossesse et l'allaitement"
                    ELSE "Produit pas compatible avec la grossesse et l'allaitement"
                END AS compatibleWithPregOrBreastfeed,
                CASE
                    WHEN isOnline = 1 THEN 'Produit visible sur le site'
                    ELSE 'Produit invisible sur le site'
                END AS isOnline,
                id_category AS category
            FROM product
            JOIN category ON product.id_category = category.id
            LEFT JOIN skinType ON product.id_skinType = skinType.id
            LEFT JOIN skinConcern ON product.id_skinConcern = skinConcern.id
            WHERE name = ?`;
        return await pool.query(SELECT_ONE, [name]);
    }

    static async createProduct(datas) {
        const INSERT = `
            INSERT INTO product
                (name,
                description,
                ingredients,
                howToUse,
                useDuration,
                precautions,
                packaging,
                image,
                alt,
                isOnline,
                id_skinType,
                id_skinConcern,
                adaptedToSensitiveSkin,
                protectsFromPollution,
                protectsFromSun,
                compatibleWithPregOrBreastfeed,
                id_category)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        return await pool.execute(INSERT, [...Object.values(datas)]);
    }

    static async updateProduct(datas) {
        const UPDATE = `
            UPDATE product
            SET
                name = ?,
                description = ?,
                ingredients = ?,
                howToUse = ?,
                precautions = ?,
                useDuration = ?,
                packaging = ?,
                image = ?,
                alt = ?,
                id_skinType = ?,
                id_skinConcern = ?,
                adaptedToSensitiveSkin = ?, 
                protectsFromPollution = ?, 
                protectsFromSun = ?, 
                compatibleWithPregOrBreastfeed = ?, 
                id_category = ?,
                isOnline = ?
            WHERE id = ?`;
        console.log("Données envoyées pour la mise à jour :", datas);
        return await pool.execute(UPDATE, datas);
    }

    static async removeProduct(id) {
        const DELETE = `DELETE FROM product WHERE id = ?`;
        return await pool.execute(DELETE, [id]);
    }

    static async addCommentToProduct(title, content, id_user, id_product) {
        const INSERT = `INSERT INTO comment (title, content, id_user, id_product) VALUES (?, ?, ?, ?)`;
        return await pool.execute(INSERT, [title, content, id_user, id_product]);
    }

};

export default Product;