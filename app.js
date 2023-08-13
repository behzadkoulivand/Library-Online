const express = require('express');

const sequelize = require('./config/database');

const app = express();

const PORT = process.env.POTR || 3000;

sequelize.sync().then((result) => {
    console.log("mySQL Connected!");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => console.log(err));