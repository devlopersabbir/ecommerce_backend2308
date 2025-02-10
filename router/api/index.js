const express = require("express");
const router = express.Router();
const auth = require("./auth");
const category = require("./category");
const product = require("./product");
// localhost:5000/api/v1/auth
router.use("/auth", auth);

// localhost:5000/api/v1/category
router.use("/category", category);

// localhost:5000/api/v1/product
router.use("/product", product);
module.exports = router;
