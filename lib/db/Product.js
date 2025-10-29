const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ⚡ toJSON transform: lav id = _id og fjern __v
productSchema.set("toJSON", {
  virtuals: true, // opretter et virtuelt 'id'
  versionKey: false, // fjerner __v
  transform: (_, ret) => {
    ret.id = ret._id; // kopier _id til id
    delete ret._id; // fjern MongoDB _id
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
