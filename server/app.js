const express = require('express');

const bodyParser = require("body-parser");

const cors = require('cors');

const app = express();

const sequelize = require('./util/database')

// const user = require('./Models/userModel');

app.use(cors());

app.use(bodyParser.urlencoded({extended : true}));

app.use(bodyParser.json());

const userRoute = require('./routes/userRoute')

app.use("/user",userRoute);

sequelize.sync();

app.listen(5000,()=>{
    console.log('connected to port 5000')
})