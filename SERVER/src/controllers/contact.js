import Contact from "../model/Contact.js";

const getAllByStatus = async (req, res) => {
    try {
        const [response] = await Contact.findAllByStatus(req.params.status);
        res.json(response);
    } catch {
        res.status(500).json({ msg: err.message });
    }
};

const create = async (req, res) => {
    try {
        const [response] = await Contact.create(req.body.email, req.body.content, req.body.id_subject);
        res.json({ msg: "Contact Form created", id: response.insertId });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const [response] = await Contact.update(req.body.status, req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Contact Form not found" });
            return;
        }
        res.json({ msg: "Status Updated", id: req.body.id });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export { getAllByStatus, create, updateStatus };