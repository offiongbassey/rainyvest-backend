const Sequelize = require("sequelize");
const sequelize = require("../util/Database");

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }, 
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: Sequelize.STRING,
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    productCode: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Product;