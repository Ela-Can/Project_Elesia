import SkinType from "../model/SkinType.js";

const getAll = async (req, res) => {
    try {
        const [response] = await SkinType.findAll();
        res.json(response);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const create = async (req, res) => {
    try {

        const [existingSkintype] = await SkinType.findAll();

        for (let skinType of existingSkintype) {
            if (req.body.label.trim() === skinType.label) {
                return res.status(400).json({ msg: "Un type de peau avec ce même nom existe déjà." });
            }
        }
        
        const [response] = await SkinType.create(req.body.label);
        res.json({ msg: "skinType Created", id: response.insertId });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const update = async (req, res) => {
    try {
        const [response] = await SkinType.update(req.body.label, req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "SkinType not found" });
            return;
        }
        res.json({ msg: "SkinType Updated", id: req.body.id });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const [response] = await SkinType.remove(req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "SkinType not found" });
            return;
        }
        res.json({ msg: "SkinType Deleted", id: req.body.id });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export { getAll, create, update, remove };