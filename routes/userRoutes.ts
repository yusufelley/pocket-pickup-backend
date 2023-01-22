import express from "express";
const router = express.Router();
import { UserAuthRequest } from "../custom";

router.post("/", (req: UserAuthRequest, res) => {
  console.log("hello mate");
  res.send(req.user);
});

export default router;
