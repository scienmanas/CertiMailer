import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import Id from "../../models/id";
import { protectUserRoutes } from "../../middlewares/protectRoutes";
import { uploadFile } from "../../helpers/cloud-bucket";

// Initialise the router
const router = Router();

router.post("/verify", async (req: Request, res: Response) => {});

router.post(
  "/issue",
  protectUserRoutes,
  async (req: Request, res: Response) => {}
);

export default router;
