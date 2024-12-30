import { NextFunction, Request, Response } from "express";
import multer from "multer";

// Middleware to handle multer errors
export function multerErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ message: "File too large. Max size is 1MB" });
    }
    return res.status(400).json({ message: "Multer error: " + err.message });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
}
