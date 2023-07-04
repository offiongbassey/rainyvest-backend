const express = require("express");
const { getMyTransactions, getTransactions } = require("../controllers/transactionController");
const { adminMiddleWare } = require("../middleWare/adminMiddleWare");
const router = express.Router();
const {userMiddleWare} = require("../middleWare/userMiddleWare");

router.get("/user", userMiddleWare, getMyTransactions);
router.get("/", adminMiddleWare, getTransactions);

module.exports = router;