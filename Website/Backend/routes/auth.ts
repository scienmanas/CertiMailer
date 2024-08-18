import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bycrypt from "bcryptjs";
import User from "../models/user";

// Initialse the router
const router = Router();

// Route - 1: Authenticate and generate a JWt Token
router.post("/login", async (req: Request, res: Response) => {
  // Get the JWT Secret
  const JWT_SECRET = process.env.JWT_SECRET as string;

  // Get email and password
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    console.log(req.body);

    // If no user then nothing or undefined is returned
    if (user === null || user === undefined) {
      return res.status(404).json({ message: "Not found" });
    }

    // Compare password for authentication
    const passwordCompare = await bycrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Get the uuser id and store it in a nice format
    const data = { user: { id: user._id } };
    // make and return a jwt token
    const authToken = jwt.sign(data, JWT_SECRET);
    res.status(200).json(authToken);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
