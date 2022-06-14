import mongoose from "mongoose";
import { User } from "../custom";

const Schema = mongoose.Schema;

// Subject To Change Test Schema
const userSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

const User = mongoose.model<User>("User", userSchema);

export default User;
