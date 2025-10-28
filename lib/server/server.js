require("dotenv").config();
const express = require("express");
const connectDB = require("../db/db.js");
const { errorHandler, notFound } = require("../middleware/errorMiddleware.js");
const productRoutes = require("../routes/productRoutes.js");

// Forbind til MongoDB
connectDB();

const app = express();

// Middleware: Parse JSON i body
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
app, listen(PORT, () => console.log(`Server kører på port ${PORT}`));

module.exports = {
  app,
};
