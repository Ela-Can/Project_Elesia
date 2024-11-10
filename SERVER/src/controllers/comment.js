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

const hideCommentAsUser = async (req, res) => {
    try {
        console.log("req.user :", req.user);
        
        const [response] = await Comment.hideCommentAsUser(req.params.id, req.user.id);
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

const hideCommentAsAdmin = async (req, res) => {
    try {
    
        const [response] = await Comment.hideCommentAsAdmin(req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Failed to hide the comment" });
            return;
        }
        res.json({ msg: "Comment successfully hidden" });
    } catch (err) {
        console.error("Erreur dans hideComment:", err);
        res.status(500).json({ msg: err.message });
    }
}

export { getAll, getAllFromProduct, hideCommentAsUser, hideCommentAsAdmin };
