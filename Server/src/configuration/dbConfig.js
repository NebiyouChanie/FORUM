const mysql = require('mysql2');
require('dotenv').config({path:'../.env'});

// DB CONFIGURATION

const dbConnection = mysql.createConnection({
    user: process.env.USER,
    database: process.env.DATABASE,
    host: process.env.HOST || "127.0.0.1",
    password: process.env.PASSWORD,
});

 
// EXPORTING AS .PROMISE()  TO ENABLE PROMISED BASED API 
module.exports =dbConnection.promise()