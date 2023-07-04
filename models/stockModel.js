const Sequelize = require('sequelize');
const sequelize = require("../util/Database");

const Stock = sequelize.define('stock', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    currentMarketPrice: Sequelize.INTEGER,
    soldPrice: Sequelize.INTEGER,
    profit: Sequelize.INTEGER,
    charges:  Sequelize.INTEGER,
    lastProfit: Sequelize.INTEGER,
    status: Sequelize.STRING,
    url: Sequelize.STRING,
    stockCode: Sequelize.STRING

});

module.exports = Stock;