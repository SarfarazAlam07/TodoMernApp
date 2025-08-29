const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
// env config 
dotenv.config();

// db connection
connectDB();

// rest object
const app = express();
// middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
//routes
app.use('/api/v1/user',require('./routes/userRoute') )
app.use('/api/v1/todo',require('./routes/todoRoutes') )
app.use('/api/v1/test',require('./routes/testRoutes') )


// static files
app.use(express.static(path.join(__dirname,"./client/build")));
app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
})
// port 
const PORT = process.env.PORT || 4040;

// liten
app.listen(PORT,()=>{
    console.log(`Node Server is Running on ${process.env.DEV_MODE} mode on Port no ${PORT}`.bgCyan);
})