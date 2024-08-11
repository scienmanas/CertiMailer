import { Router, Request, Response, NextFunction } from "express";
import { waitlistParams } from "../lib/definitions";
import { newsLetterParams } from "../lib/definitions";
import Waitlist from "../models/waitlist";
import Newsletter from "../models/newsletter";

const router = Router();

// Route - 1 : Insert wailist user
router.post("/newsletter-insert-user", async (req: Request, res: Response) => {
  // Get the body
  const userData: newsLetterParams = req.body;

  try {
    // insert data
    const data = await Newsletter.create(userData);
    res.status(201).json({ message: "Successfully added user to waitlist" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route - 2: Insert email to newsletter
router.post("/waitlist-insert-user", async (req: Request, res: Response) => {
  // Get the body
  const email: waitlistParams = req.body;

  try {
    // Insert data
    const data = await Waitlist.create(email);
    res.status(201).json({ message: "Successfully added user to newsletter" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/pending-users", (req: Request, res: Response) => {});

router.post("/approve-user", (req: Request, res: Response) => {});

router.post("/create-user", (req: Request, res: Response) => {});

export default router;
