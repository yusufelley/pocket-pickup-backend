import mongoose from "mongoose";
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
    },
    profilePicURL: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("User", userSchema);

export default Event;
