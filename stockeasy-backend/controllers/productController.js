const db = require('../config/db');

const getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products ORDER BY id DESC');
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, sku, category, price, stock } = req.body;
    if (!name || !sku || !price || !stock) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }
    const sql = 'INSERT INTO products (name, sku, category, price, stock) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.query(sql, [name, sku, category, price, stock]);
    const [[newProduct]] = await db.query('SELECT * FROM products WHERE id = ?', [result.insertId]);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sku, category, price, stock } = req.body;
    const sql = 'UPDATE products SET name = ?, sku = ?, category = ?, price = ?, stock = ? WHERE id = ?';
    await db.query(sql, [name, sku, category, price, stock, id]);
    const [[updatedProduct]] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};


module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};