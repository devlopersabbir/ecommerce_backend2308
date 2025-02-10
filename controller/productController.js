const productModel = require("../model/productModel");

async function addproductController(req, res) {
  let { name, description, sellingPrice, discountPrice, stock, category } =
    req.body;

  let images = req.files.map(
    (item) => `${process.env.HOST_URL}/${item.filename}`
  );
  try {
    const product = new productModel({
      name,
      description,
      sellingPrice,
      discountPrice,
      category,
      stock,
      image: images,
    });
    await product.save();
    res.status(201).send({
      success: true,
      msg: "Product created successfully",
      data: product,
    });
  } catch (err) {
    return res.status(500).send({ success: false, msg: err.message || err });
  }
}
module.exports = { addproductController };
