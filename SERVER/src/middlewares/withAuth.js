export default (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.isActive === 1) {
            return next();
        } else {
            return res.status(403).json({ msg: "Compte désactivé" });
        }
    }
    res.status(401).json({ msg: "Unauthorized" });
};