const express = require('express');
const port =process.env.PORT ;
const dbConnection = require('./configuration/dbConfig');
const app = express();
const userRoutes = require('./routes/userRoutes')
const answerRoutes = require('./routes/answerRoutes')
const questionRoutes = require('./routes/questionRoutes')
const cors = require('cors')
require('dotenv').config({ path: '../.env' });

app.use(cors())
// Parse JSON bodies
app.use(express.json())
 
//ROUTES
app.use('/users',userRoutes)
app.use('/questions',questionRoutes)
app.use('/answers',answerRoutes)

 

// STARTING THE SERVER AND THE DATABASESERVER

async function start() {
    try {
        // Test the database connection
        const [rows] = await dbConnection.query('SELECT 1');
        console.log("Database connected");

        app.listen(port, () => {
            console.log(`The server is listening on port: ${port}`);
        });
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
}

start();

 

 
