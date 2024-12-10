const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    const connecting = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongose connected: ${connecting.connection.host}`);
  } catch (err) {
    console.log(`MongoDb da xatolik bor!, ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;