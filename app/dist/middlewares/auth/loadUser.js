"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadUser = void 0;
const db_user_services_1 = __importDefault(require("../../utils/db-services/db.user-services"));
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID);
const verify = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const ticket = yield client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    return ticket.getPayload();
});
const loadUser = (req, res, next) => {
    verify(req.body.token)
        .then((payload) => {
        console.log(`${payload.email} has been authenticated`);
        db_user_services_1.default.getUserByEmail(payload.email)
            .then((user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user) {
                // User already in DB
                console.log("User found", user);
                req.user = user;
                console.log(req.user.fname);
            }
            else {
                // User not in DB
                const newUser = {
                    fname: payload.given_name,
                    lname: payload.family_name,
                    email: payload.email,
                    profilePicURL: payload.picture,
                };
                console.log("User not found attempting to create ...", newUser);
                yield db_user_services_1.default.addUser(newUser);
                console.log("New user added to database");
                yield db_user_services_1.default
                    .getUserByEmail(payload.email)
                    .then((user) => {
                    console.log("User found", user);
                    req.user = user;
                })
                    .catch((err) => {
                    console.log("ERROR getting new user from DB", err);
                    res.send("An error has occured the user could not be loaded from DB");
                });
            }
            next();
        }))
            .catch((err) => {
            console.log("ERROR getting user in DB", err);
            res.send("An error has occured the user could not be loaded from DB");
        });
    })
        .catch((err) => {
        console.log("ERROR validating JWT", err);
        res.send("An error has occured the user could not be authenticated");
    });
};
exports.loadUser = loadUser;
exports.default = exports.loadUser;
//# sourceMappingURL=loadUser.js.map