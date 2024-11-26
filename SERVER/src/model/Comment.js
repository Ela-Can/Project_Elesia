import pool from "../config/db.js";

class Comment {

    static async findAllPendingComments(isPublished) {
        const SELECT_PENDING = `
            SELECT
                comment.id,
                title,
                content,
                DATE_FORMAT(publishDate, '%d/%m/%Y') AS publishDate,
                CASE
                    WHEN isPublished = 0 THEN "commentaire en attente"
                END AS isPublished,
                user.id AS id_user,
                user.pseudo AS pseudo
            FROM comment
            JOIN user ON comment.id_user = user.id
            JOIN product ON comment.id_product = product.id
            WHERE isPublished = 0
            ORDER BY publishDate DESC`;
        return await pool.query(SELECT_PENDING, [isPublished]);
    }

    static async findAllModeratedComments(isPublished) {
        const SELECT_MODERATED = `
            SELECT
                comment.id,
                title,
                content,
                DATE_FORMAT(publishDate, '%d/%m/%Y') AS publishDate,
                CASE
                    WHEN isPublished = 0 THEN "commentaire en attente"
                    WHEN isPublished = 1 THEN "commentaire supprimé par l'utilisateur"
                    WHEN isPublished = 2 THEN "commentaire refusé par le modérateur"
                    WHEN isPublished = 3 THEN "commentaire validé par le modérateur"
                END AS isPublished,
                user.id AS id_user,
                user.pseudo AS pseudo
            FROM comment
            JOIN user ON comment.id_user = user.id
            JOIN product ON comment.id_product = product.id
            WHERE isPublished IN (1, 2, 3)
            ORDER BY publishDate DESC`;
        return await pool.query(SELECT_MODERATED, [isPublished]);
    }

    static async findAllFromProductId(id) {
        const SELECT_ONE = `
            SELECT
                comment.id,
                title,
                content,
                DATE_FORMAT(publishDate, '%d/%m/%Y') AS publishDate,
                CASE
                    WHEN isPublished = 0 THEN "commentaire en attente"
                    WHEN isPublished = 1 THEN "commentaire supprimé par l'utilisateur"
                    WHEN isPublished = 2 THEN "commentaire refusé par le modérateur"
                    WHEN isPublished = 3 THEN "commentaire validé par le modérateur"
                END AS isPublished,
                user.pseudo AS pseudo,
                product.name AS product_name
            FROM comment
            JOIN user ON comment.id_user = user.id
            JOIN product ON comment.id_product = product.id
            WHERE comment.id_product = ?
            AND comment.isPublished = 3`;
        return await pool.execute(SELECT_ONE, [id]);
    }

    /*static async findCommentById(id) {
        const FIND_COMMENT = `
            SELECT * FROM comment
            WHERE id = ?
        `;
        return await pool.execute(FIND_COMMENT, [id]);
    }*/

    static async hideCommentAsUser(id, id_user) {
        const UPDATE_COMMENT_STATUS = `UPDATE comment SET isPublished = 1 WHERE comment.id = ? AND id_user = ?`;
        return await pool.execute(UPDATE_COMMENT_STATUS, [id, id_user]);
    }

    static async updateCommentStatus(id, isPublished) {
        const UPDATE_STATUS = `UPDATE comment SET isPublished = ? WHERE comment.id = ?`;
        return await pool.execute(UPDATE_STATUS, [isPublished, id]);
    }

}

export default Comment;