const Sequelize = require("sequelize");
const dotenv = require('dotenv');

dotenv.config();

const Configs = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD
    ,{
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
});

module.exports = { Configs }
