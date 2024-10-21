import User from "../model/User.js";

// Gestion des utilisateurs

const getAllUsers = async (req, res) => {
    const [users] = await User.findAllUsers();
    res.json(users);
}

const getOneUserById = async (req, res) => {
    const [users] = await User.findOneUserById(req.params.id);
    res.json(users);
}

const updateUserStatus = async (req, res) => {
    try {
        const [response] = await User.updateUserStatus(req.body.isActive, req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Contact Form not found" });
            return;
        }
        res.json({ msg: "Status Updated", id: req.body.id });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const updateUserInfo = async (req, res) => {
    try {
        const [response] = await User.updateUserInfo(req.body.pseudo, req.body.email, req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Info not updated" });
            return;
        }
        res.json({ msg: "Info updated" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const removeUser = async (req, res) => {
    try {
        const [response] = await User.removeUser(req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Account not deleted" });
            return;
        }
        res.json({ msg: "Account deleted" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Gestion des commentaires

const getAllComments = async (req, res) => {
    try {
        const [comment] = await User.findAllCommentsFromUserId(req.params.id_user);
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const updateComment = async (req, res) => {
    try {
        const [response] = await User.updateComment(req.body.title, req.body.content, req.params.id_user, req.params.id_product);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Comment not updated" });
            return;
        }
        res.json({ msg: "Comment updated" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const removeComment = async (req, res) => {
    try {
        const [response] = await User.removeComment(req.params.id, req.params.id_user);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Comment not deleted" });
            return;
        }
        res.json({ msg: "Comment deleted" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Gestion des diagnostics

const getAllDiagnosticByUserId = async (req, res) => {
    try {
        const id_user = req.session.user.id;
        const [response] = await User.findAllDiagnostics(id_user);
        if (response.length === 0) {
            return res.status(404).json({ msg: "Aucun diagnostic trouvé pour cet utilisateur." });
        }
        res.json(response);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const removeDiagnostic = async (req, res) => {
    try {
        const [response] = await User.removeDiagnostic(req.params.id, req.params.id_user);
        
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Diagnostic not deleted" });
            return;
        }
        res.json({ msg: "Diagnostic deleted" });

        
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export { getAllUsers, getOneUserById, updateUserStatus, updateUserInfo, removeUser, getAllComments, updateComment, removeComment, getAllDiagnosticByUserId, removeDiagnostic };