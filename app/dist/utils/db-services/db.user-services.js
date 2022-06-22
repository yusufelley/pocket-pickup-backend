"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../../models/users"));
const addUser = ({ fname, lname, email, profilePicURL }) => {
    const user = new users_1.default({
        fname,
        lname,
        email,
        profilePicURL,
    });
    return user.save();
};
const getAllUsers = () => {
    return users_1.default.find({});
};
const getUserByEmail = (email) => {
    return users_1.default.findOne({ email });
};
exports.default = { addUser, getAllUsers, getUserByEmail };
//# sourceMappingURL=db.user-services.js.map