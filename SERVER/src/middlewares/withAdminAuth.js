export default (req, res, next) => {
    if (req.session.user && req.session.user.role === "admin") {
        return next();
    }
    res.status(401).json({ msg: "Unauthorized" });
};