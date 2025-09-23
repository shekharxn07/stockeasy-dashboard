
const express = require('express');
const router = express.Router();
const { getAllPurchases, createPurchase } = require('../controllers/purchaseController.js');

router.get('/', getAllPurchases);
router.post('/', createPurchase);

module.exports = router;