const { DataTypes } = require('sequelize');

const sequelize = require('../config/database');

const User = sequelize.define("User", {
    userCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    fullName:{
        type:DataTypes.STRING,
        allowNull: false
    }, 
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    phone:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    // books: {

    // }
});

module.exports = User;