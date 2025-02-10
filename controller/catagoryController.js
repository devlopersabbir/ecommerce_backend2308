const categoryModel = require("../model/categoryModel");

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

module.exports = { createcategory };
