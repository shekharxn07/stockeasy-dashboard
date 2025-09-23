
const db = require('../config/db');

const getAllSuppliers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM suppliers ORDER BY name ASC');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch suppliers" });
  }
};

const createSupplier = async (req, res) => {
  try {
    const { name, contact_person, email, phone } = req.body;
    const sql = 'INSERT INTO suppliers (name, contact_person, email, phone) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(sql, [name, contact_person, email, phone]);
    res.status(201).json({ message: 'Supplier created', supplierId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Failed to create supplier" });
  }
};

const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contact_person, email, phone } = req.body;
    const sql = 'UPDATE suppliers SET name = ?, contact_person = ?, email = ?, phone = ? WHERE id = ?';
    await db.query(sql, [name, contact_person, email, phone, id]);
    res.status(200).json({ message: 'Supplier updated' });
  } catch (error) {
    res.status(500).json({ message: "Failed to update supplier" });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM suppliers WHERE id = ?', [id]);
    res.status(200).json({ message: 'Supplier deleted' });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete supplier" });
  }
};

module.exports = {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};