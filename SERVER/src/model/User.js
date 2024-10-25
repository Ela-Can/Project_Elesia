import pool from "../config/db.js";

class User {

    // Gestion des utilisateurs

    static async findAllUsers() {
        const SELECT_ALL = `
            SELECT
                id,
                pseudo,
                email,
                birthdate,
                role,
                CASE
                    WHEN isActive = 1 THEN 'Compte actif'
                    ELSE 'Compte inactif'
                END AS isActive
            FROM user`;
        return await pool.query(SELECT_ALL);
    }

    static async findOneUserById(id) {
        const SELECT_ONE = `
            SELECT
                id,
                pseudo,
                email,
                birthdate,
                role,
                CASE
                    WHEN isActive = 1 THEN 'Compte actif'
                    ELSE 'Compte inactif'
                END AS isActive
            FROM user
            WHERE id = ?`;
        return await pool.query(SELECT_ONE, [id]);
    }
    
    static async updateUserStatus(isActive, id) {
        const UPDATE_STATUS = `UPDATE user SET isActive = ? WHERE id = ?`;
        return await pool.execute(UPDATE_STATUS, [isActive, id]);
    }

    static async updateUserInfo(pseudo, email, id) {
        const UPDATE_INFO = `UPDATE user SET pseudo = ?, email = ? WHERE id = ?`;
        return await pool.execute(UPDATE_INFO, [pseudo, email, id]);
    }

    static async removeUser(id) {
        const DELETE = `DELETE FROM user WHERE id = ?`;
        return await pool.execute(DELETE, [id]);
    }

    // Gestion des commentaires

    static async findAllPublishedCommentsFromUserId(id) {
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
            WHERE comment.id_user = ?
            AND isPublished = 1`;
        return await pool.execute(SELECT_ONE, [id]);
    }

    static async updateComment(title, content, id_user, id_product) {
        const UPDATE_COMMENT = `UPDATE comment SET title = ?, content = ? WHERE id_user = ? AND id_product = ?`
        return await pool.execute(UPDATE_COMMENT, [title, content, id_user, id_product]);
    }

    static async hideComment(id, id_user) {
        const UPDATE_COMMENT_STATUS = `UPDATE comment SET WHERE comment.id = ? AND id_user = ?`;
        return await pool.execute(UPDATE_COMMENT_STATUS, [id, id_user]);
    }

    // Gestion des diagnostics de peau

    static async findAllDiagnostics(id_user) {
        const SELECT_ALL = `
            SELECT
                diagnosticForm.id,
                createdDate,
                diagnosticForm.id_skinType, 
                diagnosticForm.id_skinConcern, 
                isSkinSensitive, 
                isExposedToPollution, 
                isExposedToSun, 
                isPregnantOrBreastfeeding,
                product.id AS product_id,
                product.name AS product_name, 
                product.description AS product_description, 
                product.image AS product_image, 
                product.alt AS product_alt
            FROM diagnosticForm
            LEFT JOIN productRecommandation ON diagnosticForm.id = productRecommandation.id_diagnosticForm
            LEFT JOIN product ON productRecommandation.id_product = product.id
            WHERE id_user = ?`;
        return await pool.query(SELECT_ALL, [id_user]);
    }

    static async removeDiagnostic(id, id_user) {
        const DELETE_DIAGNOSTIC = `DELETE FROM diagnosticForm WHERE diagnosticForm.id = ? AND id_user = ?`;
        return await pool.execute(DELETE_DIAGNOSTIC, [id, id_user]);
    }

};

export default User;