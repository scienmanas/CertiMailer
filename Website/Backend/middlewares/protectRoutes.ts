import { createHash } from "crypto";
import { Request, Response, NextFunction } from "express";

export const protectUserRoutes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // To be updates
};

export const protectAdminRoutes = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the header
  const ADMIN_AUTH_KEY: string | undefined = req.header("admin-auth-token") as string;
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
