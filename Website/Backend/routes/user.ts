import { Router, Request, Response, NextFunction } from "express";
import { waitlistParams } from "../lib/definitions";
import { newsLetterParams } from "../lib/definitions";
import Waitlist from "../models/waitlist";
import Newsletter from "../models/newsletter";
import PendingUser from "../models/pending-user";

// Make router
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

// Route - 3: See the pending user - only for admin
// --------------------- To Test-----------------
router.get("/add-to-pending-users", async (req: Request, res: Response) => {

  // Get all users in pending list
  try {
    const data = await PendingUser.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route - 4: Cancel user - only for admin
// --------------------- To Test-----------------
router.delete("/cancel-from-pending-list", async (req: Request, res: Response) => {
  // Get the body
  const { _id } = req.body;

  try {
    await PendingUser.deleteOne({ _id: _id });
    res.status(204).json({message: "Pending user removed successfullt"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Route - 5: 
router.post("/create-user", (req: Request, res: Response) => {
  // Auto generate the passord + approval + deletion from peding list
});

// Pending - One more admin route to get all the data of the user on admin pannel

export default router;
