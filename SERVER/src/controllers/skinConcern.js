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

        const [existingSkinconcern] = await SkinConcern.findAll();

        for (let SkinConcern of existingSkinconcern) {
            if (req.body.label.trim() === SkinConcern.label) {
                return res.status(400).json({ msg: "Une préoccupation avec ce même nom existe déjà." });
            }
        }

        const [response] = await SkinConcern.create(req.body.label);
        res.json({ msg: "SkinConcern Created", id: response.insertId });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const update = async (req, res) => {
    try {
        const [response] = await SkinConcern.update(req.body.label, req.params.id);
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