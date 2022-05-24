import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Subject To Change Test Schema
const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sport: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
