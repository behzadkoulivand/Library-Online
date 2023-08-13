const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("library_db", "root", "behzad1245", {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;