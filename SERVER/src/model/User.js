import pool from "../config/db.js";

class User {

    // Managing users

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

    // Managing comments

    static async findAllValidatedCommentsFromUserId(id) {
        const SELECT_ONE = `
            SELECT
                comment.id,
                title,
                content,
                DATE_FORMAT(publishDate, '%d/%m/%Y') AS publishDate,
                isPublished,
                user.pseudo AS pseudo,
                product.name AS product_name
            FROM comment
            JOIN user ON comment.id_user = user.id
            JOIN product ON comment.id_product = product.id
            WHERE comment.id_user = ?
            AND isPublished = 3`;
        return await pool.execute(SELECT_ONE, [id]);
    }

    static async updateComment(title, content, id_user, id_comment) {
        const UPDATE_COMMENT = `UPDATE comment SET title = ?, content = ?, isPublished = 0 WHERE id_user = ? AND comment.id = ?`
        return await pool.execute(UPDATE_COMMENT, [title, content, id_user, id_comment]);
    }

    static async hideComment(id, id_user) {
        const UPDATE_COMMENT_STATUS = `UPDATE comment SET isPublished = 1 WHERE id = ? AND id_user = ?`;
        return await pool.execute(UPDATE_COMMENT_STATUS, [id, id_user]);
    }

    // Managing diagnostics

    static async findAllDiagnostics(id_user) {
        const SELECT_ALL = `
            SELECT
                diagnosticForm.id,
                DATE_FORMAT(createdDate, '%d/%m/%Y') AS createdDate,
                diagnosticForm.id_skinType,
                skinType.label AS skinTypeLabel,
                diagnosticForm.id_skinConcern,
                skinConcern.label AS skinConcernLabel,
                CASE 
                    WHEN isSkinSensitive = 1 THEN 'Oui'
                    ELSE 'Non'
                END AS isSkinSensitive,
                CASE 
                    WHEN isExposedToPollution = 1 THEN 'Fréquemment'
                    ELSE 'Occasionnellement'
                END AS isExposedToPollution,
                CASE 
                    WHEN isExposedToSun = 1 THEN 'Fréquemment'
                    ELSE 'Occasionnellement'
                END AS isExposedToSun,
                CASE 
                    WHEN isPregnantOrBreastfeeding = 1 THEN 'Oui'
                    ELSE 'Non'
                END AS isPregnantOrBreastfeeding,
                product.id AS product_id,
                product.name AS product_name, 
                product.image AS product_image, 
                product.alt AS product_alt
            FROM diagnosticForm
            LEFT JOIN skinType ON diagnosticForm.id_skinType = skinType.id
            LEFT JOIN skinConcern ON diagnosticForm.id_skinConcern = skinConcern.id
            LEFT JOIN productRecommandation ON diagnosticForm.id = productRecommandation.id_diagnosticForm
            LEFT JOIN product ON productRecommandation.id_product = product.id
            WHERE id_user = ?
            ORDER BY diagnosticForm.createdDate DESC`;
        return await pool.query(SELECT_ALL, [id_user]);
    }

    static async removeDiagnostic(id, id_user) {
        const DELETE_DIAGNOSTIC = `DELETE FROM diagnosticForm WHERE diagnosticForm.id = ? AND id_user = ?`;
        return await pool.execute(DELETE_DIAGNOSTIC, [id, id_user]);
    }

};

export default User;