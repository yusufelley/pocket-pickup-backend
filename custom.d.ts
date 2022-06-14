import mongoose from "mongoose";
import { Request } from "express";

export interface User extends mongoose.Document {
  fname: string;
  lname?: string;
  email: string;
  profilePicURL?: string;
}

export interface UserAuthRequest extends Request {
  user?: User;
}
