const express = require('express');
const router = express.Router();
const { getAllSales, createSale, getSaleById } = require('../controllers/saleController.js');


router.get('/', getAllSales);


router.post('/', createSale);


router.get('/:id', getSaleById);

module.exports = router;