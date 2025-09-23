// controllers/saleController.js
const db = require('../config/db');

const getAllSales = async (req, res) => {
  try {
    // BADLAV YAHAN HAI: Hum DATE_FORMAT() ka istemaal kar rahe hain
    const sql = `
      SELECT 
        id, 
        customer_name, 
        DATE_FORMAT(sale_date, '%Y-%m-%d') as sale_date, 
        total_amount 
      FROM sales 
      ORDER BY sale_date DESC, id DESC
    `;
    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({ message: "Failed to fetch sales" });
  }
};

const createSale = async (req, res) => {
  // ... (createSale ka code aage ke liye bilkul theek hai, koi badlav nahi) ...
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    // BADLAV YAHAN BHI HAI: Yahan bhi DATE_FORMAT() use karein
    const [[sale]] = await db.query(`
      SELECT 
        id, 
        customer_name, 
        DATE_FORMAT(sale_date, '%Y-%m-%d') as sale_date, 
        total_amount 
      FROM sales 
      WHERE id = ?
    `, [id]);
    
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    // ... (baaki getSaleById ka code theek hai) ...
  } catch (error) {
    // ...
  }
};

module.exports = { getAllSales, createSale, getSaleById };
