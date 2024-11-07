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

const hideComment = async (req, res) => {
    try {
        const [response] = await Comment.hideComment(req.params.id, req.user.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Failed to hide the comment" });
            return;
        }
        res.json({ msg: "Comment successfully hidden" });
    } catch (err) {
        console.error("Erreur dans hideComment:", err);
        res.status(500).json({ msg: err.message });
    }
};

export { getAll, getAllFromProduct, hideComment };
