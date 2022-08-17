import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { UserAuthRequest } from "./custom";
import loadUser from "./middlewares/auth/loadUser";
import Event from "./models/events";
const userRouter = require('./routes/users');

// access environment variables
dotenv.config();
// create express app
const app = express();
const port = process.env.PORT || 3000;
// parse incoming requests as JSON
app.use(express.urlencoded({ extended: true }));
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

app.post("/create_event", (req, res) => {
  const newEvent = new Event({
    name: req.body.name,
    duration: req.body.duration,
    time: req.body.time,
    location: req.body.location
  });

  newEvent.save().then((result: any) => { res.send(newEvent) }).catch((err: any) => { console.log(err) });
});

app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Pocket Pick-Up listening on port ${port}`);
});

