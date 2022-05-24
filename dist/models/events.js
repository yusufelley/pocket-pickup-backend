"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sport: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Event = mongoose_1.default.model("Event", eventSchema);
exports.default = Event;
//# sourceMappingURL=events.js.map