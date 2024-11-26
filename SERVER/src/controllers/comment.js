import Comment from "../model/Comment.js";

const getAllPendingComments = async (req, res) => {
    try {
        const comment = await Comment.findAllPendingComments();
        if (comment.length === 0) {
            return res.status(404).json({ msg: "Aucun commentaire en attente" });
        }
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const getAllModeratedComments = async (req, res) => {
    try {
        const comment = await Comment.findAllModeratedComments();
        if (comment.length === 0) {
            return res.status(404).json({ msg: "Aucun commentaire historisé" });
        }
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

const updateCommentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isPublished } = req.body;

        if (!id || typeof isPublished === "undefined") {
            return res.status(400).json({ msg: "Missing or invalid parameters" });
        }
        
        const [response] = await Comment.updateCommentStatus(id, isPublished);
        
        if (!response.affectedRows) {
            return res.status(404).json({ msg: "Comment not found or status unchanged" });
        }

        res.json({ msg: "Comment successfully hidden" });
    } catch (err) {
        console.error(`Error updating comment status (id: ${id}, isPublished: ${isPublished}):`, err);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export { getAllPendingComments, getAllModeratedComments, getAllFromProduct, hideCommentAsUser, updateCommentStatus };
