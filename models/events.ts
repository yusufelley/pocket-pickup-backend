import mongoose from "mongoose";
import { ModuleResolutionKind } from "typescript";

// Subject To Change Test Schema
const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true
    },
    time: {
      type: Array,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    coming: {
      type: Number,
      required: false
    },
    here: {
      type: Number,
      required: false
    },
    description: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
