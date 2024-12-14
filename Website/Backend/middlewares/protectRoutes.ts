import { createHash } from "crypto";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { ObjectId } from "mongoose";

interface CustomRequest extends Request {
  user?: ObjectId;
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
  const token: string = req.header("auth-token") as string;
  if (!token) {
    return res.status(401).json({ message: "Unauthorised - No Token" });
  }

  try {
    const decode = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // For no valid token got
    if (!decode) {
      return res.status(401).json({ message: "Unauthorised - Invalid Token" });
    }

    // Find the user in database and check whther he is correct
    const findUser = await User.findById(decode.user._id);
    if (!findUser) {
      return res.status(401).json({ message: "Unauthorised" });
    }

    req.user = findUser._id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).status(401).json({ message: "Unathorised" });
  }
};

export const protectAdminRoutes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the header
  const ADMIN_AUTH_KEY: string | undefined = req.header(
    "admin-auth-token"
  ) as string;
  if (ADMIN_AUTH_KEY === undefined) {
    res.status(401).json({ message: "Access Denied" });
    return;
  }

  // Get the hashed key
  const ADMIN_HASHED_KEY: string = process.env.ADMIN_HASHED_KEY as string;

  // Compute double hash
  let hash = createHash("sha256").update(ADMIN_AUTH_KEY).digest("hex");
  hash = createHash("sha256").update(hash).digest("hex");

  // Check the Authenticity
  if (hash === ADMIN_HASHED_KEY) {
    next();
  } else {
    res.status(401).json({ message: "Access Denied" });
  }
};
