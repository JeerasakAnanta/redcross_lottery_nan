require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./configs/db.config')
// const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const lotteriesRoute = require('./routes/lotteries_route')
const authenRoute = require('./routes/authen_route')
const rewardRoute = require('./routes/reward_route')

app.use('/api_recross_ocr', lotteriesRoute)
app.use('/api_recross_ocr', authenRoute)
app.use('/api_recross_ocr', rewardRoute)


sequelize.authenticate()
    .then(() => {
        console.log('Connected to MySQL database.');
    })
    .catch(err => {
        console.error('Unable to connect to the database: ', err);
    });


const port = process.env.NODE_PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});