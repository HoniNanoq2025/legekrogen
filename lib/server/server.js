require("dotenv").config({ path: ".env.local" });
const express = require("express");
const cors = require("cors");
const connectDB = require("../db/db.js");
const { errorHandler, notFound } = require("../middleware/errorMiddleware.js");
const productRoutes = require("../routes/productRoutes.js");

// Forbind til MongoDB
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware: Parse JSON i body
app.use(express.json());

// CORS Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Tillad denne origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Tilladte HTTP metoder
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Tillad cookies og authorization headers
  })
);

// Routes
app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server kører på port ${PORT}`));

module.exports = app;
