"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
// access environment variables
dotenv_1.default.config();
// create express app
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// establish db connection
mongoose_1.default.connect(process.env.DB_URI, {
    dbName: "pocket-pickup-db",
    user: "pocket-pickup-user",
    pass: process.env.DB_PASS,
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Pocket Pick-Up listening on port ${port}`);
});
//# sourceMappingURL=server.js.map