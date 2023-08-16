const {DataTypes} = require('sequelize');

const sequelize = require('../config/database');

const Reserve = sequelize.define("Reserve", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: Math.floor(Math.random() * 1000) + 100,
        allowNull: false
    },
    user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    book: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    borrowDate: {
        type: DataTypes.DATE,
        defaultValue: Date.now
    },
    returnDate: {
        type: DataTypes.DATE
    }
});

module.exports = Reserve;