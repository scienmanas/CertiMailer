import { Router, Request, Response } from "express";
import Certificate from "../models/certificate";
import { certificatesParams } from "../lib/definitions";
import { protectAdminRoutes } from "../middlewares/protectRoutes";

// Initialise the router
const router = Router();

// Route - 1: Get the certificates information
router.get("/get-info", async (req: Request, res: Response) => {
  // Get the id to serach for
  const { _id } = req.body;

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

export default router;

// Router - 2: Insert data
router.post(
  "/insert-data",
  protectAdminRoutes,
  async (req: Request, res: Response) => {
    // Get the body data to be inserted
    const bodyData: certificatesParams = req.body;

    try {
      // Insert the data
      const data = await Certificate.create(bodyData);
      console.log(data);

      res.status(201).json({ message: "Data Successfully inserted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
