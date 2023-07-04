const asyncHandler = require('express-async-handler');
const Stock = require("../models/stockModel");
const Product = require("../models/productModel");
const User = require('../models/userModel');
const sequelize = require('../util/Database');
const DailyPrice = require('../models/dailyPriceModel');

exports.createStock = asyncHandler(async(req, res, next) => {
    const {quantity} = req.body;
    const {url} = req.params;
    if(!url){
        res.status(400);
        throw new Error("Product Unidentified");
    }
    if(!quantity){
        res.status(400);
        throw new Error("Please provide Quantity");
    }
    if(quantity < 1){
        res.status(400)
        throw new Error("Quantity cannot be less than 1");
    }
    const product = await Product.findOne({where: {url}});
    if(!product){
        res.status(404);
        throw new Error("Product not found");
    }
    const stockCode = Math.floor(1967542189026 + Math.random() * 900000);

    const addStock = await req.user
    .createStock({
        price: product.price,
        quantity,
        total: product.price * quantity,
        status: 'Pending',
        stockCode,
        productId: product.id
    });
    if(addStock){
        res.status(201).json({message: "Your Stock is being processed", stockCode:stockCode});
    }else{
        res.status(500);
        throw new Error("An error occured, please try again later");
    }
});

exports.getStocks = asyncHandler(async(req, res, next) => {
    const stocks = await Stock.findAll({order: [['id', 'DESC']],
    attributes: [
        "id",
        "total",
        "status",
        "stockCode",
        [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('stock.createdAt'), '%D %b %Y %h:%i:%p'), 'createdAt']
    ],
    include: [
        {model: Product},
        {model: User, 
        attributes: [
            "id",
            "firstName",
            "lastName"
        ]
        }
    ]
});
    if(!stocks){
        res.status(400);
        throw new Error("Stocks not available");
    }
    res.status(200).json(stocks);
});

exports.getStock = asyncHandler(async(req, res, next) => {
    const {stockCode} = req.params;
    const stock = await Stock.findOne({where: {stockCode},
        attributes: [
            "id",
            "price",
            "quantity",
            "total",
            "currentMarketPrice",
            "soldPrice",
            "profit",
            "charges",
            "lastProfit",
            "status",
            "url",
            "stockCode",
            "productId",
            [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('stock.createdAt'), '%D %b %Y %h:%i:%p'), 'createdAt']
        ],
        include: [
            {model: Product},
            {model: User,
            attributes: [
                "id",
                "firstName",
                "lastName",
                "email"
            ]
            }
        ]
    });
    if(!stock){
        res.status(404);
        throw new Error("Stock not available");
    }
      const dailyPrice = await DailyPrice.findAll({where: {productId: stock.productId},
        attributes: [
            "id",
            "price",
            [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('createdAt'), '%D %b %Y %h:%i:%p'), 'createdAt']
        ]
    })
    res.status(200).json({stock, dailyPrice});
});
exports.getStocksByUser = asyncHandler(async(req, res, next) => {
    const {userId} = req.params;
    const stocks = await Stock.findAll({where: {userId:userId}});
    if(!stocks){
        res.status(404);
        throw new Error("Stocks not found");
    }
    res.status(200).json(stocks);
});
exports.sellStock = asyncHandler(async(req, res, next) => {
    const {stockCode} = req.params;
    if(!stockCode){
        res.status(400);
        throw new Error("Stock Code is required");
    }
    const stock = await Stock.findOne({where: {stockCode: stockCode, userId: req.user.id}});
    if(!stock){
        res.status(404);
        throw new Error("Stock not available");
    }
    //check if product has already been sold
    if(stock.status === 'Sold'){
        res.status(500);
        throw new Error("Stock already sold!");
    }
    if(stock.stat === 'Pending'){
        res.status(500);
        throw new Error("You didn't purchase this stock");
    }
    //get current price of the stock product
    const product = await Product.findOne({where: {id:stock.productId}});
    if(!product){
        res.status(400);
        throw new Error("An error occured, please contact customer care");
    }
    const currentPrice = product.price;
    const sellingPrice = currentPrice * stock.quantity;
    
    const profit = sellingPrice - stock.total;
    const lastProfit = sellingPrice - stock.charges;
    const currentBalance = req.user.balance + lastProfit;
    //update stock
    stock.currentMarketPrice = currentPrice,
    stock.soldPrice = sellingPrice,
    stock.profit = profit,
    stock.lastProfit = lastProfit,
    stock.status = 'Sold'

    const saveStock = await stock.save();
    if(saveStock){
        //update balance
        const user = await User.findOne({where:{id:req.user.id}});
        if(!user){
            res.status(404);
            throw new Error("User not found");
        }
        user.balance = currentBalance;
        await user.save();
        res.status(200).json("Stock Successfully Sold");
    }else{
        res.status(500);
        throw new Error("Sorry, an error occured, please try again later");
    }

});


exports.approveStockPayment = asyncHandler(async(req, res, next) => {
    const {stockCode} = req.params;
    if(!stockCode){
        res.status(400);
        throw new Error("Please provide a Stock Code");
    }
    const stock = await Stock.findOne({where: {stockCode}});
    if(!stock){
        res.status(400);
        throw new Error("Invalid Stock Code");
    }
    if(stock.status === 'Active' || stock.status === 'Sold'){
        res.status(400);
        throw new Error("Payment already approved");
    }
    stock.status = "Active";
    const saveStock = await stock.save();
    if(saveStock){
        //create transaction
        const amount = stock.total;
        const transactionCode = stockCode;
        const type = 'Debit';
        const description = `Purchase of Stock: ${stockCode}`;
        const status = 'Successful';
        await req.user
        .createTransaction({
            amount,
            transactionCode,
            type,
            description,
            status
        });

        return   res.status(200).json("Stock Successfully Purchased");
    }else{
        res.status(500);
        throw new Error("An error occured, please try again later");
    }

});

exports.getUserStocks = asyncHandler(async(req, res, next) => {
    const stocks = await Stock.findAll({where: {userId:req.user.id}, 
        include: [
            {model: Product}
        ],
        order: [['id', 'DESC']]});
    if(!stocks){
        res.status(404);
        throw new Error("No Stock Found!");
    }
    res.status(200).json(stocks);
});


exports.getUserStock = asyncHandler(async(req, res, next) => {
    const {stockCode} = req.params;
    const stock = await Stock.findOne({where: 
        {userId:req.user.id, stockCode:stockCode},
        attributes: [
            "id",
            "price",
            "quantity",
            "total",
            "currentMarketPrice",
            "soldPrice",
            "profit",
            "charges",
            "lastProfit",
            "status",
            "url",
            "stockCode",
            "productId",
            [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('stock.createdAt'), '%D %b %Y %h:%i:%p'), 'createdAt']
        ],
        include: [
            {model: Product},
            {model: User,
            attributes: [
                "id",
                "firstName",
                "email"
            ]
            }
        ]
        
    });
    if(!stock){
        res.status(404);
        throw new Error("Stock not available");
    }
      const dailyPrice = await DailyPrice.findAll({where: {productId: stock.productId},
        attributes: [
            "id",
            "price",
            [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('createdAt'), '%D %b %Y %h:%i:%p'), 'createdAt']
        ]
    })
    res.status(200).json({stock, dailyPrice});
});