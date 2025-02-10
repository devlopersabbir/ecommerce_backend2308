const { default: mongoose, Schema } = require("mongoose");
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    description: {
      type: String,
    },
    image: {
      type: Array,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    stock: {
      type: Number,
    },
    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    rating: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating",
      },
    ],
    sellingPrice: {
      type: String,
      required: true,
    },
    discountPrice: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
