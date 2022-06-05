import mongoose from "mongoose";
import UserService from "../utils/db-services/db.user-services";

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

const User = mongoose.model("User", userSchema);

export default UserService(User);
