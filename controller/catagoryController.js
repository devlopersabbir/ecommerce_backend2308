const categoryModel = require("../model/categoryModel");
const fs = require("fs");
const path = require("path");
async function createcategory(req, res) {
  let { name, description } = req.body;

  let category = new categoryModel({
    name,
    description,
    image: `${process.env.HOST_URL}/${req.file.filename}`,
  });
  await category.save();
  return res.status(201).send({ success: true, msg: "category is created" });
}
async function deleteCategory(req, res) {
  let { id } = req.params;
  try {
    let category = await categoryModel.findOneAndDelete({ _id: id });
    let imagepath = category.image.split("/");
    let oldimagepath = imagepath[imagepath.length - 1];
    fs.unlink(
      `${path.join(__dirname, "../uploads")}/${oldimagepath}`,
      (err) => {
        if (err) {
          res.status(500).json({
            success: false,
            msg: `${err.message ? err.message : "Internal server error"}`,
            err,
          });
        } else {
          res.status(200).json({
            success: true,
            msg: `Catagory deleted successfully`,
            data: category,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: `${error.message ? error.message : "Internal server Error"}`,
      error,
    });
  }
}
async function allCategory(req, res) {
  try {
    let allCategory = await categoryModel.find({});
    res.status(200).json({
      success: true,
      msg: `All category fetch successfull`,
      data: allCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `${error.message ? error.message : "Internal server error"}`,
      error,
    });
    res.status(500).json({
      success: false,
      msg: `${error.message ? erroremessage : "Internal server error"}`,
      error,
    });
  }
}
async function updateCategoryController(req, res) {
  const { id } = req.params;
  let { name, description } = req.body;
  const image = req.file;
  const { filename } = image;
  try {
    let category = await categoryModel.findOneAndUpdate(
      { _id: id },
      {
        name,
        description,
        image: `${process.env.HOST_URL}/${req.file.filename}`,
      }
    );
    let imagepath = category.image.split("/");
    let oldimagepath = imagepath[imagepath.length - 1];

    fs.unlink(
      `${path.join(__dirname, "../uploads")}/${oldimagepath}`,
      (err) => {
        if (err) {
          res.status(500).json({
            success: false,
            msg: `${err.message ? err.message : "Internal server error"}`,
            err,
          });
        } else {
          res.status(200).json({
            success: true,
            msg: `Catagory updated successfully`,
            data: category,
          });
        }
      }
    );
  } catch (error) {}
}
async function singleCategoryController(req, res) {
  let { id } = req.params;
  try {
    let singleCategory = await categoryModel.findOne({ _id: id });
    if (!singleCategory) {
      return res.status(404).json({
        success: false,
        msg: `Category not found`,
      });
    }
    res.status(200).json({
      success: true,
      msg: `singleCategory fetch successful`,
      data: singleCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Internal server Error`,
      error: error.message,
    });
  }
}

module.exports = {
  createcategory,
  deleteCategory,
  allCategory,
  updateCategoryController,
  singleCategoryController,
};
