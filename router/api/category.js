const express = require("express");
const {
  createcategory,
  deleteCategory,
  allCategory,
  updateCategoryController,
  singleCategoryController,
} = require("../../controller/catagoryController");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../../middleware/authMiddleware");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniquename = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extention = file.originalname.split(".");
    cb(
      null,
      file.fieldname + "-" + uniquename + `.${extention[extention.length - 1]}`
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
function errCheck(err, req, res, next) {
  if (err) {
    return res.status(500).send({ success: false, msg: err.message });
  }
  next();
}
// localhost:5000/api/v1/category/createcategory
router.post(
  "/createcategory",
  authMiddleware,
  upload.single("image"),
  errCheck,
  createcategory
);
// localhost:5000/api/v1/category/deleteCategory
router.delete("/deleteCategory/:id", deleteCategory);

// localhost:5000/api/v1/category/allCategory
router.get("/allCategory", allCategory);

// localhost:5000/api/v1/category/updateCategory
router.patch(
  "/updateCategory/:id",
  upload.single("image"),
  updateCategoryController
);

// localhost:5000/api/v1/category/singleCategory/:id
router.get("/singleCategory/:id", singleCategoryController);
module.exports = router;
