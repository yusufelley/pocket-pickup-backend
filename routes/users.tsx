import express from "express";
const router = express.Router();
import { UserAuthRequest } from "../custom";

router.post("/", (req: UserAuthRequest, res) => {
  res.send(req.user);
});

module.exports = router; 