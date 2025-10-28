const products = require("../../data/products.json");

const Product = require("../db/product.js");

const getProducts = async (req, res) => {
  const allProducts = await Product.find({});
  res.json(allProducts);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Produkt ikke fundet" });
};

const importProducts = async (req, res) => {
  await Product.deleteMany();
  const created = await Product.insertMany(products);
  res.status(201).json(created);
};

const createProduct = async (req, res) => {
  const { name, price, description, image } = req.body;

  const newProduct = new Product({ name, price, description, image });
  const saved = await newProduct.save();
  res.status(201).json(saved);
};

const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (updated) res.json(updated);
  else res.status(404).json({ message: "Produkt findes ikke" });
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Produkt slettet" });
  } else res.status(404).json({ message: "Produkt findes ikke" });
};

module.exports = {
  getProducts,
  getProductById,
  importProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
