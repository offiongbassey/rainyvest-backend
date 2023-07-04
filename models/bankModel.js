const Sequelize = require("sequelize");
const sequelize = require("../util/Database");

const Bank = sequelize.define('bank', {
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
    code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: Sequelize.STRING
});

module.exports = Bank;