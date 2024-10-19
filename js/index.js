// index.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Lấy danh sách tất cả bản ghi
app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Lấy một sản phẩm theo ID
app.get('/products/:id', (req, res) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm!' });
    }
    res.json(results[0]);
  });
});

// Thêm sản phẩm mới
app.post('/products', (req, res) => {
  const { name, price } = req.body;
  const query = 'INSERT INTO products (name, price) VALUES (?, ?)';
  db.query(query, [name, price], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Thêm sản phẩm thành công!', id: result.insertId });
  });
});

// Cập nhật sản phẩm
app.put('/products/:id', (req, res) => {
  const { name, price } = req.body;
  const query = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
  db.query(query, [name, price, req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Cập nhật sản phẩm thành công!' });
  });
});

// Xóa sản phẩm
app.delete('/products/:id', (req, res) => {
  const query = 'DELETE FROM products WHERE id = ?';
  db.query(query, [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Xóa sản phẩm thành công!' });
  });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
