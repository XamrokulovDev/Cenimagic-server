const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors');
const connectDB = require("./config/db");
const errorHandle = require('./middlewares/error');

require("dotenv").config();

// body-parse 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middlewares 
app.use(cors());

// developer tools 
if(process.env.NODE_ENV === "developer"){
    app.use(morgan("dev"));
};

// mongoDb server 
connectDB();

// errorHandle 
app.use(errorHandle);

// Routers 
app.use("/api/v1/auth", require("./routes/user.route"));
app.use("/api/v1/movies", require("./routes/movie.route"));
app.use("/api/v1/swagger", require("./routes/swagger.route"));

// PORT and Listening 
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Listen on ${PORT} port...`);
});