import pool from "../config/db.js";

class Diagnostic {

    static async getUserBirthdate(id) {

        const SELECT_BIRTHDATE = `SELECT birthdate FROM user WHERE id = ?`;

        console.log("SQL query result:", SELECT_BIRTHDATE);

        return await pool.query(SELECT_BIRTHDATE, [id]);

        
        
        //if (rows.length === 0) {
        //    throw new Error("User not found");
        //}

        //return rows;
    }

    static async findProduct(id_user) {
        const SELECT_PRODUCT = `
            SELECT
                product.id,
                name,
                description,
                product.image,
                product.alt
            FROM product
            JOIN diagnosticForm ON
                    diagnosticForm.id_skinType = product.id_skinType
                AND (diagnosticForm.id_skinConcern = product.id_skinConcern)
                AND (diagnosticForm.isSkinSensitive = product.adaptedToSensitiveSkin)
                AND (diagnosticForm.isExposedToPollution = product.protectsFromPollution)
                AND (diagnosticForm.isExposedToSun = product.protectsFromSun)
                AND (diagnosticForm.isPregnantOrBreastfeeding = product.compatibleWithPregOrBreastfeed)
            WHERE diagnosticForm.id_user = ?
            LIMIT 1`;
        return await pool.execute(SELECT_PRODUCT, [id_user]);
    }

    static async createProductReco(id_diagnosticForm, id_product) {
        const INSERT_RECO = `INSERT INTO productRecommandation (id_diagnosticForm, id_product) VALUES (?, ?)`;
        return await pool.execute(INSERT_RECO, [id_diagnosticForm, id_product]);
    }

    static async createDiagnostic(datas) {
        const INSERT_DIAGNOSTIC = `
            INSERT INTO diagnosticForm 
                (id_user, id_skinType, id_skinConcern, isSkinSensitive, isExposedToPollution, isExposedToSun, isPregnantOrBreastfeeding) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        return await pool.execute(INSERT_DIAGNOSTIC, [ ...Object.values(datas)] );
    }

};

export default Diagnostic;