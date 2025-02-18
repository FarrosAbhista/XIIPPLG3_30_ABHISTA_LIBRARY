const express = require("express");
const bodyParser = require("body-parser");
const loansRoutes = require("./routes/loans");
const categoriesRoutes = require("./routes/categories");
const booksRoutes = require("./routes/books");
const usersRoutes = require('./routes/users')
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/loans", loansRoutes);
app.use("/categories", categoriesRoutes);
app.use("/books", booksRoutes);
app.use("/users", usersRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
