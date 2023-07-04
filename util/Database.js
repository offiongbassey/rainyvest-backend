const Sequelize = require('sequelize');
const database = process.env.DATABASE_NAME;
const host = process.env.DATABASE_HOST;
const username = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;

const sequelize = new Sequelize('rainyvest', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;