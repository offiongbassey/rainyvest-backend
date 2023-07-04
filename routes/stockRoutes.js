const express = require('express');
const { createStock, getStocks, getStock, getStocksByUser, sellStock, getUserStocks, getUserStock, approveStockPayment } = require('../controllers/stockController');
const { adminMiddleWare } = require('../middleWare/adminMiddleWare');
const router = express.Router();
const {userMiddleWare} = require("../middleWare/userMiddleWare");

router.put('/create/:url', userMiddleWare, createStock);
router.get('/viewall/:userId', adminMiddleWare, getStocksByUser);
router.get('/view/:stockCode', adminMiddleWare, getStock);
router.patch('/sell/:stockCode', userMiddleWare, sellStock);
router.get('/userstocks', userMiddleWare, getUserStocks);
router.get('/userstock/:stockCode', userMiddleWare, getUserStock);
router.put("/approvepayment/:stockCode", userMiddleWare, approveStockPayment);

router.get('', adminMiddleWare, getStocks);

module.exports = router;