import express from "express";

import product_routes from "./product.routes.js";
import category_routes from "./category.routes.js";
import comment_routes from "./comment.routes.js";
import skintype_routes from "./skinType.routes.js";
import skinconcern_routes from "./skinConcern.routes.js";
import contact_routes from "./contact.routes.js";
import subject_routes from "./subject.routes.js";
import diagnostic_routes from "./diagnostic.routes.js";
import auth_routes from "./auth.routes.js";
import user_routes from "./user.routes.js";

const router = express.Router();

router.use("/product", product_routes);
router.use("/category", category_routes);
router.use("/comment", comment_routes);

router.use("/skintype", skintype_routes);
router.use("/skinconcern", skinconcern_routes);

router.use("/contact", contact_routes);
router.use("/subject", subject_routes);

router.use("/diagnostic", diagnostic_routes);

router.use("/authentification", auth_routes);
router.use("/user", user_routes);

router.get("*", (req, res) => {
	res.status(404).json({ msg: "Not found" });
});

export default router;