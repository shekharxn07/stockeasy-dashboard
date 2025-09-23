const db = require('../config/db');

const getAllPurchases = async (req, res) => {
  try {
    const sql = `
      SELECT p.id, p.supplier, p.purchase_date, p.total_amount, COUNT(pi.id) as items_count
      FROM purchases p
      LEFT JOIN purchase_items pi ON p.id = pi.purchase_id
      GROUP BY p.id
      ORDER BY p.purchase_date DESC
    `;
    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).json({ message: "Failed to fetch purchases" });
  }
};

const createPurchase = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const { supplier, items, amount } = req.body;

    await connection.beginTransaction();

    const totalAmount = parseFloat(String(amount).replace(/[^0-9.-]+/g,""));
    const purchaseSql = 'INSERT INTO purchases (supplier, purchase_date, total_amount) VALUES (?, CURDATE(), ?)';
    const [purchaseResult] = await connection.query(purchaseSql, [supplier, totalAmount]);
    const newPurchaseId = purchaseResult.insertId;

    for (const item of items) {
      const updateStockSql = 'UPDATE products SET stock = stock + ? WHERE id = ?';
      await connection.query(updateStockSql, [Number(item.quantity), item.id]);

      const itemSql = 'INSERT INTO purchase_items (purchase_id, product_id, quantity, price_per_unit) VALUES (?, ?, ?, ?)';
      // The fix is in the line below
      const price = parseFloat(String(item.price).replace(/[^0-9.-]+/g,""));
      await connection.query(itemSql, [newPurchaseId, item.id, item.quantity, price]);
    }

    await connection.commit();
    res.status(201).json({ message: 'Purchase created successfully!', purchaseId: newPurchaseId });

  } catch (error) {
    await connection.rollback();
    console.error("Error creating purchase:", error);
    res.status(500).json({ message: "Failed to create purchase", error: error.message });
  } finally {
    connection.release();
  }
};

module.exports = { getAllPurchases, createPurchase };