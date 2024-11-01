import pool from "../config/db.js";

class Comment {

    static async findAll() {
        const SELECT_ALL = `
            SELECT
                comment.id,
                title,
                content,
                DATE_FORMAT(publishDate, '%d/%m/%Y') AS publishDate,
                CASE
                    WHEN isPublished = 1 THEN 'commentaire visible'
                    ELSE 'commentaire non visible'
                END AS isPublished,
                user.pseudo AS pseudo,
                product.name AS product_name
            FROM comment
            JOIN user ON comment.id_user = user.id
            JOIN product ON comment.id_product = product.id`;
        return await pool.query(SELECT_ALL);
    }

    static async findAllFromProductId(id) {
        const SELECT_ONE = `
            SELECT
                comment.id,
                title,
                content,
                DATE_FORMAT(publishDate, '%d/%m/%Y') AS publishDate,
                CASE
                    WHEN isPublished = 1 THEN 'commentaire visible'
                    ELSE 'commentaire non visible'
                END AS isPublished,
                user.pseudo AS pseudo,
                product.name AS product_name
            FROM comment
            JOIN user ON comment.id_user = user.id
            JOIN product ON comment.id_product = product.id
            WHERE comment.id_product = ?`;
        return await pool.execute(SELECT_ONE, [id]);
    }

}

export default Comment;