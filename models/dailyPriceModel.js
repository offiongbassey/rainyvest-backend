const Sequelize = require("sequelize");
const sequelize = require("../util/Database");

const DailyPrice = sequelize.define('dailyprice', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = DailyPrice;