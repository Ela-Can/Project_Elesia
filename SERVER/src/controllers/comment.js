import Comment from "../model/Comment.js";

const getAll = async (req, res) => {
    try {
        const { id } = req.params;
        const [comment] = await Comment.findAll(id);
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const getAllFromProduct = async (req, res) => {
    try {
        const [comment] = await Comment.findAllFromProductId(req.params.id);
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const addComment = async (req, res) => {
    try {
        const { title, content } = req.body;
        const data = {
            id_user: req.session.user.id,
            id_product: parseInt(req.params.id_product), 
            title,
            content,
        };
        const [result] = await Comment.addCommentToProduct(data);
        if (result.affectedRows === 0)
            throw new Error("Impossible d'ajouter le commentaire");
        res.status(201).json({ msg: "Votre commentaire a bien été envoyé !" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export { getAll, getAllFromProduct, addComment}
