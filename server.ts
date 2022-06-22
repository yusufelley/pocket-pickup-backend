import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { UserAuthRequest } from "./custom";
import loadUser from "./middlewares/auth/loadUser";
import https from "https";
import fs from "fs";
// access environment variables
dotenv.config();
// https credentials
const privateKey = fs.readFileSync("./key.pem", "utf8");
const certificate = fs.readFileSync("./cert.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };
// create express app
const app = express();
const httpsServer = https.createServer(credentials, app);
const port = process.env.PORT || 5000;
// parse incoming requests as JSON
app.use(express.json());
app.use(cors()); // Needed for dev
// establish db connection
mongoose.connect(process.env.DB_URI, {
  dbName: "pocket-pickup-db",
  user: "pocket-pickup-user",
  pass: process.env.DB_PASS,
});
// User Auth
app.use(loadUser);

// Routes
app.get("/", (req: UserAuthRequest, res) => {
  res.send(`Hello, ${req.user.fname}`);
});

app.get("/user", (req: UserAuthRequest, res) => {
  res.send(req.user);
});

httpsServer.listen(port, () => {
  console.log(`Pocket Pick-Up listening on port ${port}`);
});
