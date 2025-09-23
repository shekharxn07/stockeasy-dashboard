
const db = require('../config/db');

const getReportSummary = async (req, res) => {
  try {
    const [[{ totalRevenue }]] = await db.query('SELECT SUM(total_amount) as totalRevenue FROM sales');
    const [[{ totalCost }]] = await db.query('SELECT SUM(total_amount) as totalCost FROM purchases');
    const [[{ totalInventoryValue }]] = await db.query('SELECT SUM(price * stock) as totalInventoryValue FROM products');
    const [[{ productCount }]] = await db.query('SELECT COUNT(*) as productCount FROM products');

    const grossProfit = (totalRevenue || 0) - (totalCost || 0);

    res.status(200).json({
      totalRevenue: totalRevenue || 0,
      totalCost: totalCost || 0,
      grossProfit,
      totalInventoryValue: totalInventoryValue || 0,
      productCount
    });

  } catch (error) {
    console.error("Error fetching report summary:", error);
    res.status(500).json({ message: "Failed to fetch report summary" });
  }
};

module.exports = {
  getReportSummary,
};