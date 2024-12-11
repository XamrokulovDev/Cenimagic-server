const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const errorHandle = require("./middlewares/error");

require("dotenv").config();

// Middleware-lar
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// "public/video" file static 
app.use("/uploads", express.static(path.join(__dirname,"public/video")));

// Foydali vositalar (faqat ishlab chiqaruvchi rejimida)
if (process.env.NODE_ENV === "developer") {
    app.use(morgan("dev"));
}

// MongoDB ulanishi
connectDB();

// Routerlarni ulash
app.use("/api/v1/auth", require("./routes/user.route"));
app.use("/api/v1/movies", require("./routes/movie.route"));
app.use("/api/v1/swagger", require("./routes/swagger.route"));

// Xatoliklarni boshqarish
app.use(errorHandle);

// Portni tinglash
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server ${PORT}-portda ishlamoqda...`);
});