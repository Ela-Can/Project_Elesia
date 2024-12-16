import Diagnostic from "../model/Diagnostic.js";

const create = async (req, res) => {
    try {

        const id_user = req.session.user.id;
        
        if (!id_user) {
            return res.status(400).json({ msg: "Impossible de récupérer l'utilisateur. Assurez-vous d'être connecté." });
        }

        const { id_skinType, id_skinConcern, isSkinSensitive, isExposedToPollution, isExposedToSun, isPregnantOrBreastfeeding } = req.body;

        if (!id_skinType || !id_skinConcern) {
            return res.status(400).json({ msg: "Le type de peau et les préoccupations sont obligatoires." });
        }

        const datas = {
            id_user,
            id_skinType,
            id_skinConcern,
            isSkinSensitive: parseInt(isSkinSensitive),
            isExposedToPollution: parseInt(isExposedToPollution),
            isExposedToSun: parseInt(isExposedToSun),
            isPregnantOrBreastfeeding: parseInt(isPregnantOrBreastfeeding),
        };

        const [productRecommandation] = await Diagnostic.findProduct(id_user);


        const filtredProducts = productRecommandation.filter((product) =>
            product.id_skinType === datas.id_skinType &&
            product.id_skinConcern === datas.id_skinConcern
        );

        const [response] = await Diagnostic.createDiagnostic(datas);

        if (!response || response.affectedRows === 0) { 
            throw new Error("Impossible de soumettre le diagnostic"); 
        }
  
        const diagnosticId = response.insertId;

        const product = filtredProducts[0];

        const [insertRecommandation] = await Diagnostic.createProductReco(diagnosticId, product.id);

        if (insertRecommandation.affectedRows === 0) {
            throw new Error("Impossible de soumettre la recommandation de produit");
        }
        
        res.status(201).json({
            msg: "Diagnostic envoyé avec succès et produit recommandé.", diagnosticId, product
  
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export { create };