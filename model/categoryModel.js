const { default: mongoose, Schema } = require("mongoose");

let categorySchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
      trim: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Category", categorySchema);
