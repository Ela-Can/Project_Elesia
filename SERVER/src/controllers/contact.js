import Contact from "../model/Contact.js";

const getAllByStatus = async (req, res) => {
    try {
        const [response] = await Contact.findAllByStatus(req.params.status);
        res.json(response);
    } catch {
        res.status(500).json({ msg: err.message });
    }
};

const validEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const create = async (req, res) => {
    try {

        const email = req.body.email.trim();
        const content = req.body.content.trim();

        if (!email || !content) {
            return res.status(400).json({ msg: "Fields are required" });
        }

        if (email.length > 100) {
            return res.status(400).json({ msg: "Email must be 100 characters or less" });
        }

        if (content.length > 500) {
            return res.status(400).json({ msg: "Content must be 500 characters or less" });
        }

        if (!validEmail(email)) {
            return res.status(400).json({ msg: "Invalid email format" });
        }

        const [response] = await Contact.create(email, content, req.body.id_subject);
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