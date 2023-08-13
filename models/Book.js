const {DataTypes} = require('sequelize');

const sequelize = require('../config/database');
const User = require('./User');

const Book = sequelize.define("Book", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
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
    }
    
});

Book.hasOne(User);

module.exports = User;