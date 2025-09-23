// server.js
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');
const saleRoutes = require('./routes/sales');
const supplierRoutes = require('./routes/suppliers'); // Naya route import karein
const purchaseRoutes = require('./routes/purchases');
const reportRoutes = require('./routes/reports');
const authRoutes = require('./routes/auth');
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { res.json({ message: "Welcome!" }); });

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/suppliers', supplierRoutes); // Naya route use karein
app.use('/api/purchases', purchaseRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/auth', authRoutes); // Naya route use karein
app.use('/api/products', productRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});