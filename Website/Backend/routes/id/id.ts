import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import Certificate from "../../models/id";
import { certificatesParams } from "../../lib/definitions";

// Initialise the router
const router = Router();

// Route - 1: Get the certificates information
router.get("/verify", async (req: Request, res: Response) => {
  // Get the id to serach for
  const { _id } = req.headers;

  if (!_id || !mongoose.Types.ObjectId.isValid(_id as string)) {
    res.status(404).json({ message: "Invalid ID format" });
    return;
  }

  try {
    const data: certificatesParams = (await Certificate.findById(
      _id
    )) as certificatesParams;

    if (data === null) {
      res.status(404).json({ message: "No data found" });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Router - 2: Insert data
router.post("/upload", async (req: Request, res: Response) => {
  // Get the body data to be inserted
  const bodyData = req.body;

  try {
    // Insert the data
    const data = await Certificate.create(bodyData);
    // Return id and data
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
