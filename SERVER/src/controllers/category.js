import Category from "../model/Category.js";

const getAll = async (req, res) => {
    try {
        const [response] = await Category.findAll();
        res.json(response);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const getOneById = async (req, res) => {
    try {
        const { id } = req.params;
        const [response] = await Category.findOne(id);
        res.json(response);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

const create = async (req, res) => {
    try {
        const [existingCategories] = await Category.findAll();

        for (let category of existingCategories) {
            if (req.body.label === category.label) {
                return res.status(400).json({ msg: "Une catégorie avec ce même nom existe déjà." });
            }
        }

        const label = req.body.label;
        const ref = req.body.ref;

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

        const { id } = req.params;

        const [existingCategory] = await Category.findOne(id);

        if (existingCategory.length === 0) {
            console.error("Catégorie non trouvée pour l'ID :", id);
            return res.status(404).json({ msg: "Category not found" });
        }

        console.log("Catégorie actuelle trouvée :", existingCategory[0]);


        const label = req.body.label;
        const ref = req.body.ref;

        if (!label) {
            return res.status(400).json({ msg: "Label is required and cannot be empty" });
        }
        if (!ref) {
            return res.status(400).json({ msg: "Reference is required and cannot be empty" });
        }

        if (label.length > 50) {
            return res.status(400).json({ msg: "Label must be 50 characters or less" });
        }
        
        console.log("Mise à jour de la catégorie avec ID :", req.params.id, "Label :", label, "Ref :", ref);

        const [response] = await Category.update(label, ref, id);
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

export { getAll, getOneById, create, update, remove };