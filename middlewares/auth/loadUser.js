import db from "../../utils/db-services/db.user-services";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.CLIENT_ID);
const verify = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  console.log(process.env.CLIENT_ID);
  return ticket.getPayload();
};

export const loadUser = (req, res, next) => {
  console.log("Attempting to verify token:", req.body.token);
  verify(req.body.token)
    .then((payload) => {
      console.log(`${payload.email} has been authenticated`);
      db.getUserByEmail(payload.email)
        .then(async (user) => {
          if (user) {
            // User already in DB
            console.log("User found", user);
            req.user = user;
            console.log(req.user.fname);
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
            await db
              .getUserByEmail(payload.email)
              .then((user) => {
                console.log("User found", user);
                req.user = user;
              })
              .catch((err) => {
                console.log("ERROR getting new user from DB", err);
                res.send(
                  "An error has occured, the user could not be loaded from DB"
                );
              });
          }
          next();
        })
        .catch((err) => {
          console.log("ERROR getting user in DB", err);
          res.send(
            "An error has occured, the user could not be loaded from DB"
          );
        });
    })
    .catch((err) => {
      console.log("ERROR validating JWT", err);
      res.send("An error has occured, the user could not be authenticated");
    });
};

export default loadUser;
