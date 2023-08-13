const express = require('express');
const dotEnv = require('dotenv');

const sequelize = require('./config/database');
const {errorHandler} = require('./middlewares/errors');

dotEnv.config({path: "./config/config.env"});

const app = express();

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/users", require("./routes/user"));

// Error Handller
app.use(errorHandler);

const PORT = process.env.POTR || 3000;

sequelize.sync().then((result) => {
    console.log("mySQL Connected!");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => console.log(err));