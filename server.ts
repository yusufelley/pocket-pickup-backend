import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// access environment variables
dotenv.config();
// create express app
const app = express();
const port = process.env.PORT || 5000;
// establish db connection
mongoose.connect(process.env.DB_URI, {
  dbName: "pocket-pickup-db",
  user: "pocket-pickup-user",
  pass: process.env.DB_PASS,
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Pocket Pick-Up listening on port ${port}`);
});
