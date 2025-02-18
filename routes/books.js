const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all books
router.get('/', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
      if (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(results);
      }
    });
  });

  // Add a new book
router.post('/', (req, res) => {
    const { title, writer, user_id, category_id, publisher, year } = req.body;
    if (!title || !writer || !user_id || !category_id || !publisher || !year) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    db.query('INSERT INTO books (title, writer, user_id, category_id, publisher, year) VALUES (?, ?, ?, ?, ?, ?)', 
      [title, writer, user_id, category_id, publisher, year], 
      (err, results) => {
        if (err) {
          console.error("Database error:", err.message);
          res.status(500).json({ error: err.message });
        } else {
          res.status(201).json({ id: results.insertId, title, writer, user_id, category_id, publisher, year });
        }
      }
    );
  });


  // Update a book
router.put('/:id', (req, res) => {
    const { title, writer, user_id, category_id, publisher, year } = req.body;
    const { id } = req.params;
    if (!title || !writer || !user_id || !category_id || !publisher || !year) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    db.query('UPDATE books SET title = ?, writer = ?, user_id = ?, category_id = ?, publisher = ?, year = ? WHERE id = ?', 
      [title, writer, user_id, category_id, publisher, year, id], 
      (err, results) => {
        if (err) {
          console.error("Database error:", err.message);
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).json({ message: 'Book Updated', id, title, writer, user_id, category_id, publisher, year });
        }
      }
    );
  });

  // Delete a book
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM books WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error("Database error:", err.message);
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({ message: 'Book Deleted', id });
      }
    });
  });

module.exports = router;
