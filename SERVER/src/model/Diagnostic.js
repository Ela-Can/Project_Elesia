import pool from "../config/db.js";

class Diagnostic {

    static async findProduct(id_user) {
        const SELECT_PRODUCT = `
            SELECT DISTINCT
                product.id,
                name,
                description,
                product.image,
                product.alt,
                product.id_skinType,
                product.id_skinConcern 
            FROM product
            JOIN diagnosticForm ON diagnosticForm.id_user = ?
            WHERE diagnosticForm.id_skinType = product.id_skinType
                AND diagnosticForm.id_skinConcern = product.id_skinConcern
                AND diagnosticForm.isSkinSensitive = product.adaptedToSensitiveSkin
                AND diagnosticForm.isExposedToPollution = product.protectsFromPollution
                AND diagnosticForm.isExposedToSun = product.protectsFromSun
                AND diagnosticForm.isPregnantOrBreastfeeding = product.compatibleWithPregOrBreastfeed
            `;
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