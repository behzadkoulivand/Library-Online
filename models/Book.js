const {DataTypes} = require('sequelize');

const sequelize = require('../config/database');

const Book = sequelize.define("Book", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author:{
        type: DataTypes.STRING,
        defaultValue:"اعلام نشده"
    },
    reserved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    reservator:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
    
});

module.exports = Book;