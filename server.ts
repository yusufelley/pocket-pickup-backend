import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { OAuth2Client } from "google-auth-library";
import db from "./utils/db-services/db.user-services";
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

// Load User
app.use((req, res, next) => {
  verify(req.body.token)
    .then((payload) => {
      console.log(`${payload.email} has been authenticated`);
      db.getUserByEmail(payload.email)
        .then(async (user) => {
          if (user) {
            // User already in DB
            console.log("User found", user);
            // req.user = user;
          } else {
            // User not in DB
            const newUser = {
              fname: payload.given_name,
              lname: payload.family_name,
              email: payload.email,
              profilePicURL: payload.picture,
            };
            console.log("User not found attempting to create ...", newUser);
            await db.addUser(newUser);
            console.log("New user added to database");
            db.getUserByEmail(payload.email)
              .then((user) => console.log("User found", user))
              .catch((err) =>
                console.log("ERROR getting new user from DB", err)
              );
          }
        })
        .catch((err) => console.log("ERROR getting user in DB", err));
      res.send(`Hello, ${payload.email}`);
    })
    .catch((err) => {
      console.log("ERROR validating JWT", err);
      res.send("An error has occured the user code not be authenticated");
    });
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.post("/auth/google", (req, res) => {
//   // Probably have to change query to body when React client is sending JWT
//   verify(req.query.token)
//     .then((payload) => {
//       console.log(`${payload.email} has been authenticated`);
//       db.getUserByEmail(payload.email).then((user) => {
//         console.log(user);
//       });
//       // User does not exist
//       if (db.getUserByEmail(payload.email)) {
//       } else {
//         // User exists
//       }
//       res.send(`Hello, ${payload.email}`);
//     })
//     .catch((err) => {
//       console.error("ERROR:", err);
//       res.send("An error has occured the user code not be authenticated");
//     });
// });

app.listen(port, () => {
  console.log(`Pocket Pick-Up listening on port ${port}`);
});
