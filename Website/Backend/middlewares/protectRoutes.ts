import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { ObjectId } from "mongoose";

interface CustomRequest extends Request {
  userId?: ObjectId;
}
interface JwtPayload {
  user: {
    _id: string;
  };
}
const JWT_SECRET: string = process.env.JWT_SECRET as string;

export const protectUserRoutes = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // Get the user from the jwt token
  const token: string = req.cookies?.authToken;
  if (!token)
    return res.status(401).json({ message: "Unauthorised - No Token" });

  try {
    // Decode
    const decode = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // For no valid token got
    if (!decode)
      return res.status(401).json({ message: "Unauthorised - Invalid Token" });

    // Find the user in database and check whther he is correct
    const findUser = await User.findById(decode.user._id);
    if (!findUser) return res.status(401).json({ message: "Unauthorised" });

    req.userId = findUser._id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).status(401).json({ message: "Unathorised" });
  }
};
