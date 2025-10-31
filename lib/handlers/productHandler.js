// Importerer produkter fra JSON-fil
const products = require("../../data/products.json");

// Importerer Product modellen fra MongoDB
const Product = require("../models/Product.js");

const { getImageUrl } = require("../helpers/urlHelper.js");

// GET alle produkter
const getProducts = async (req, res) => {
  try {
    // Hent alle produkter fra database
    const allProducts = await Product.find({});

    // Tilføj full URLs til billeder
    const productsWithUrls = allProducts.map((product) => ({
      ...product.toJSON(),
      image: getImageUrl(product.image),
    }));

    res.json(productsWithUrls);
  } catch (err) {
    console.error("getProducts error:", err);
    res.status(500).json({ message: "Fejl ved henting af produkter" });
  }
};

// GET produkt via ID
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: "Produkt ikke fundet" });
};

// POST importerer produkter fra JSON-fil
const importProducts = async (req, res) => {
  // Sletter alle eksisterende produkter
  await Product.deleteMany();
  // Indsætter alle produkter fra JSON-filen
  const created = await Product.insertMany(products);
  // Returnerer oprettede produkter
  res.status(201).json(created);
};

// CREATE opret et nyt produkt
const createProduct = async (req, res) => {
  const { name, price, description, image } = req.body;
  // Opretter nyt produkt baseret på request body
  const newProduct = new Product({ name, price, description, image });

  // Gemmer produkt i databasen
  const saved = await newProduct.save();
  // Returner gemt produkt med status 201 Created
  res.status(201).json(saved);
};

// UPDATE af eksisterende produkt
const updateProduct = async (req, res) => {
  // Finder og opdaterer produkt med ID fra request, returnerer den opdaterede version
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Returnerer den opdaterede version
  });

  if (updated) res.json(updated);
  else res.status(404).json({ message: "Produkt findes ikke" });
};

// DELETE produkt
const deleteProduct = async (req, res) => {
  // Finder produkt med ID
  const product = await Product.findById(req.params.id);
  if (product) {
    // Hvis produkt findes, slet det
    await product.deleteOne();
    res.json({ message: "Produkt slettet" });
  } else res.status(404).json({ message: "Produkt findes ikke" });
};

// Eksporterer alle funktioner som modul (CommonJS)
module.exports = {
  getProducts,
  getProductById,
  importProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
