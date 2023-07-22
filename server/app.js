const express = require('express');

const bodyParser = require("body-parser");

const cors = require('cors');

const app = express();

const sequelize = require('./util/database')

app.use(bodyParser.urlencoded({extended : true}));

app.use(bodyParser.json());

app.use(cors());

sequelize.sync();

app.listen(5000,()=>{
    console.log('connected to port 5000')
})