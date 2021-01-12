require("dotenv").config();
const mongoose = require("mongoose");
const db = process.env.MONGODB_URI || "mongodb://localhost/pwa-app";
const connectDB = async () => {
  
    // try/catch
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
    return mongoose.connection;
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;