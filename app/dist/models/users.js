"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
// Subject To Change Test Schema
const userSchema = new Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePicURL: {
        type: String,
        required: false,
    },
}, { timestamps: true });
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=users.js.map