import Subject from "../model/Subject.js";

const getAll = async (req, res) => {
    try {
        const [response] = await Subject.findAll();
        res.json(response);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const getAllByStatus = async (req, res) => {
    try {
        const [response] = await Subject.findAllActiveSubjects();
        res.json(response);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

const create = async (req, res) => {
    try {
        const label = req.body.label.trim();

        if (!label) {
            return res.status(400).json({ msg: "Le champ label est requis et ne peut pas être vide." });
        }

        if (label.length > 100) {
            return res.status(400).json({ msg: "Le champ label ne peut pas dépasser 50 caractères." });
        }

        const [existingSubject] = await Subject.findAll();

        for (let subject of existingSubject) {
            if (req.body.label.trim() === subject.label) {
                return res.status(400).json({ msg: "Un sujet avec ce même nom existe déjà." });
            }
        }

        const [response] = await Subject.create(label);
        res.json({ msg: "Subject Created", id: response.insertId });
        
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

        if (label.length > 100) {
            return res.status(400).json({ msg: "Le champ label ne peut pas dépasser 50 caractères." });
        }

        const [existingSubject] = await Subject.findAll();

        for (let subject of existingSubject) {
            if (req.body.label.trim() === subject.label) {
                return res.status(400).json({ msg: "Un sujet avec ce même nom existe déjà." });
            }
        }

        const [response] = await Subject.update(label, req.params.id);
        if (!response.affectedRows) {
			res.status(404).json({ msg: "Subject not found" });
			return;
		}
        res.json({ msg: "Subject Updated", id: req.body.id });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const hideSubject = async (req, res) => {
    try {
        const { subjectStatus } = req.body;
        const [response] = await Subject.hideSubject(req.params.id, subjectStatus);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Subject not found" });
            return;
        }
        res.json({ msg: "Subject Deleted", id: req.body.id });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export { getAll, getAllByStatus, create, update, hideSubject };
