const express = require("express");
const bodyParser = require("body-parser");
const categoriesRoutes = require("./routes/categories");
const loansRoutes = require('./routes/loans')
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/kategori", categoriesRoutes);
app.use("./loans", loansRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});