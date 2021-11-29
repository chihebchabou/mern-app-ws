const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // The process core module provides a handy method that allows you to programmatically exit from a Node.js program: process.exit().
    process.exit(1);
  }
};

module.exports = connectDB;
