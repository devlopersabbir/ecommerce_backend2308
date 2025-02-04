const express = require("express");
const { createcategory } = require("../../controller/catagoryController");
const multer = require("multer");
const router = express.Router();
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
  upload.single("image"),
  errCheck,
  createcategory
);

module.exports = router;
