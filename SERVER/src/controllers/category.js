import Category from "../model/Category.js";

const getAll = async (req, res) => {
    try {
        const [response] = await Category.findAll();
        res.json(response);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const create = async (req, res) => {
    try {
        const [existingCategories] = await Category.findAll();

        for (let category of existingCategories) {
            if (req.body.label.trim() === category.label) {
                return res.status(400).json({ msg: "Une catégorie avec ce même nom existe déjà." });
            }
        }

        const label = req.body.label.trim();
        const ref = req.body.ref.trim();

        if (!label) {
            return res.status(400).json({ msg: "Label is required and cannot be empty" });
        }
        if (!ref) {
            return res.status(400).json({ msg: "Reference is required and cannot be empty" });
        }

        if (label.length > 50) {
            return res.status(400).json({ msg: "Label must be 50 characters or less" });
        }

        const [response] = await Category.create(label, ref);

        res.json({ msg: "Category Created", id: response.insertId });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const update = async (req, res) => {
    try {
        const [existingCategories] = await Category.findAll();

        for (let category of existingCategories) {
            if (req.body.label.trim() === category.label) {
                return res.status(400).json({ msg: "Une catégorie avec ce même nom existe déjà." });
            }
        }

        const label = req.body.label.trim();
        const ref = req.body.ref.trim();

        if (!label) {
            return res.status(400).json({ msg: "Label is required and cannot be empty" });
        }
        if (!ref) {
            return res.status(400).json({ msg: "Reference is required and cannot be empty" });
        }

        if (label.length > 50) {
            return res.status(400).json({ msg: "Label must be 50 characters or less" });
        }
        
        const [response] = await Category.update(label, ref, req.params.id);
        if (!response.affectedRows) {
			res.status(404).json({ msg: "Category not found" });
			return;
		}
        res.json({ msg: "Category Updated", id: req.body.id });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const [response] = await Category.remove(req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Category not found" });
            return;
        }
        res.json({ msg: "Category Deleted", id: req.body.id });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export { getAll, create, update, remove };