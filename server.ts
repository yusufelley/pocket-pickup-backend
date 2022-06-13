import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { OAuth2Client } from "google-auth-library";
import cors from "cors";
// access environment variables
dotenv.config();
// create express app
const app = express();
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
const client = new OAuth2Client(process.env.CLIENT_ID);
export const verify = async (token: string) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  return ticket.getPayload();
};

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth/google", (req, res) => {
  console.log(req.query.token);
  verify(req.query.token)
    .then((payload) => {
      console.log(`${payload.email} has been authenticated`);
      res.send(`Hello, ${payload.email}`);
    })
    .catch((err) => {
      console.error("ERROR:", err);
      res.send("An error has occured the user code not be authenticated");
    });
});

app.listen(port, () => {
  console.log(`Pocket Pick-Up listening on port ${port}`);
});
