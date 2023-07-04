const http = require('http');
const express = require('express');
const authRoute = require("./routes/authRoutes");
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors");
const errorHandler = require("./middleWare/errorHandler");
const sequelize = require('./util/Database');
const Product = require("./models/productModel");
const User = require("./models/userModel");
const productRoute = require('./routes/productRoutes');
const DailyPrice = require('./models/dailyPriceModel');
const Stock = require("./models/stockModel");
const stockRoute = require('./routes/stockRoutes');
const Transaction = require('./models/transactionModel');
const transactionRoute = require("./routes/transactionRoutes");


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


//api auth
// app.use((req, res, next)=> {
//     const apiKey = req.params.x-api-key;
//     if(!apiKey || apiKey !== process.env.NODE_API_KEY){
//         return res.status(500).json({error: "Unathorized Access, Please Provide your apkiKey"});
//     }else{
//         next();
//     }
// })


app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use('/api/auth', authRoute);
app.use('/api/transaction', transactionRoute);
app.use("/api/products", productRoute);
app.use("/api/stock", stockRoute);

//database test ends here


app.get('/', (req, res, next) => {
    res.send("Backend Successfully Connected");
});

//error handler
app.use(errorHandler);

//product association
User.hasMany(Product);
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});

//Transaction association
User.hasMany(Transaction);
Transaction.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});

//daily price association
DailyPrice.belongsTo(Product, {constraints: true, onDelete: 'CASCADE'});
Product.hasMany(DailyPrice);
DailyPrice.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(DailyPrice);

//stock association
Stock.belongsTo(Product, {constraints: true, onDelete: 'CASCADE'});
Product.hasMany(Stock);
Stock.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Stock);

sequelize.sync()
.then(result => {

})
.catch(err => {
    console.log(err);
});

app.listen(9000);