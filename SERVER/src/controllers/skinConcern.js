import SkinConcern from "../model/SkinConcern.js";

const getAll = async (req, res) => {
    try {
        const [response] = await SkinConcern.findAll();
        res.json(response);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const create = async (req, res) => {
    try {

        const label = req.body.label.trim();

        if (!label) {
            return res.status(400).json({ msg: "Le champ label est requis et ne peut pas être vide." });
        }

        if (label.length > 50) {
            return res.status(400).json({ msg: "Le champ label ne peut pas dépasser 50 caractères." });
        }

        const [existingSkinconcern] = await SkinConcern.findAll();

        for (let SkinConcern of existingSkinconcern) {
            if (req.body.label.trim() === SkinConcern.label) {
                return res.status(400).json({ msg: "Une préoccupation avec ce même nom existe déjà." });
            }
        }

        const [response] = await SkinConcern.create(label);
        res.json({ msg: "SkinConcern Created", id: response.insertId });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const update = async (req, res) => {
    try {

        const label = req.body.label.trim();

        if (!label) {
            return res.status(400).json({ msg: "Le champ label est requis et ne peut pas être vide." });
        }

        if (label.length > 50) {
            return res.status(400).json({ msg: "Le champ label ne peut pas dépasser 50 caractères." });
        }

        const [existingSkinconcern] = await SkinConcern.findAll();

        for (let SkinConcern of existingSkinconcern) {
            if (req.body.label.trim() === SkinConcern.label) {
                return res.status(400).json({ msg: "Une préoccupation avec ce même nom existe déjà." });
            }
        }

        const [response] = await SkinConcern.update(label, req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "SkinConcern not found" });
            return;
        }
        res.json({ msg: "SkinConcern Updated", id: req.body.id });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const [response] = await SkinConcern.remove(req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "SkinConcern not found" });
            return;
        }
        res.json({ msg: "SkinConcern Deleted", id: req.body.id });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export { getAll, create, update, remove };