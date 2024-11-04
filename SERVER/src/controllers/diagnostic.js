import Diagnostic from "../model/Diagnostic.js";

function calculateAge(birthdate) {
    const today = new Date();

    const birthDate = new Date(birthdate);
    console.log("Converted Birthdate:", birthDate);

    let age = today.getFullYear() - birthDate.getFullYear();

    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age-- ;
    }

    return age;
};

const create = async (req, res) => {
    try {
        //if (!req.session || !req.session.user) { 
        //    return res.status(400).json({ msg: "Impossible de récupérer l'utilisateur. Assurez-vous d'être connecté." }); // À MODIFIER
        //}

        const id_user = req.session.user.id;
        console.log("ID utilisateur extrait de la session:", id_user);
        
        if (!id_user) {
            return res.status(400).json({ msg: "Impossible de récupérer l'utilisateur. Assurez-vous d'être connecté." });
        }

        const [user] = await Diagnostic.getUserBirthdate(id_user);

        const birthdate = user[0].birthdate;

        console.log("Birthdate from database:", birthdate);
        console.log("User object:", user[0].birthdate);  

        const age = calculateAge(birthdate);

        console.log("User age:", age);

        if (age < 18) {
            return res.status(400).json({ msg: "You must be at least 18 years old to submit a diagnostic." });
        }

        const { id_skinType, id_skinConcern, isSkinSensitive, isExposedToPollution, isExposedToSun, isPregnantOrBreastfeeding } = req.body;
        const datas = {
            id_user,
            id_skinType,
            id_skinConcern,
            isSkinSensitive,
            isExposedToPollution,
            isExposedToSun,
            isPregnantOrBreastfeeding,
        };

        console.log("Données du diagnostic à insérer :", datas);

        const [response] = await Diagnostic.createDiagnostic(datas);

        console.log("Résultat de l'insertion du diagnostic :", response);

        if (!response || response.affectedRows === 0) { 
            throw new Error("Impossible de soumettre le diagnostic"); 
        }


        const diagnosticId = response.insertId;

        if (response.affectedRows === 0) {
            throw new Error("Impossible de soumettre le diagnotic");
        }

        const [productRecommandation] = await Diagnostic.findProduct(id_user);
        
        console.log("Produits recommandés trouvés :", productRecommandation);

        if (productRecommandation.length === 0) {
            throw new Error("Aucun produit adapté n'a été trouvé pour ce diagnostic");
        }

        const product = productRecommandation[0];

        const [insertRecommandation] = await Diagnostic.createProductReco(diagnosticId, product.id);

        if (insertRecommandation.affectedRows === 0) {
            throw new Error("Impossible de soumettre la recommandation de produit");
        }
        
        res.status(201).json({ msg: "Diagnostic envoyé et le produit recommandé :", product });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export { create };