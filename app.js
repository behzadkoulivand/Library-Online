const express = require('express');

const sequelize = require('./config/database');
const {errorHandler} = require('./middlewares/errors');

const app = express();

// Error Handller
app.use(errorHandler);

const PORT = process.env.POTR || 3000;

sequelize.sync().then((result) => {
    console.log("mySQL Connected!");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => console.log(err));