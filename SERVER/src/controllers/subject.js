import Subject from "../model/Subject.js";

const getAll = async (req, res) => {
    try {
        const [response] = await Subject.findAll();
        res.json(response);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
// ajouter une condition pour éviter de créer un même sujet

const create = async (req, res) => {
    try {

        const [existingSubject] = await Subject.findAll();

        for (let subject of existingSubject) {
            if (req.body.label.trim() === subject.label) {
                return res.status(400).json({ msg: "Un sujet avec ce même nom existe déjà." });
            }
        }

        const [response] = await Subject.create(req.body.label);
        res.json({ msg: "Subject Created", id: response.insertId });
        
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const update = async (req, res) => {
    try {
        const [response] = await Subject.update(req.body.label, req.params.id);
        if (!response.affectedRows) {
			res.status(404).json({ msg: "Subject not found" });
			return;
		}
        res.json({ msg: "Subject Updated", id: req.body.id });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const [response] = await Subject.remove(req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Subject not found" });
            return;
        }
        res.json({ msg: "Subject Deleted", id: req.body.id });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export { getAll, create, update, remove };
