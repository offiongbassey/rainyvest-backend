const Sequelize = require('sequelize');
const sequelize = require("../util/Database");

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    lastName: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photo: Sequelize.STRING,
    phone: Sequelize.STRING,
    status: Sequelize.STRING,
    role: Sequelize.STRING,
    token: Sequelize.STRING,
    tokenStatus: Sequelize.STRING,
    resetToken: Sequelize.STRING,
    pinToken: Sequelize.STRING,
    balance: Sequelize.INTEGER,
    pin: Sequelize.STRING,
    accountNumber: Sequelize.INTEGER,
    accountName: Sequelize.STRING,
    bank: Sequelize.STRING,
    bankId: Sequelize.INTEGER,
    bankStatus: Sequelize.STRING,
    bankRecipientCode: Sequelize.STRING,
    bankCode: Sequelize.STRING,
    googleId: Sequelize.STRING,
    accountType: Sequelize.STRING,
}
);

module.exports = User;

