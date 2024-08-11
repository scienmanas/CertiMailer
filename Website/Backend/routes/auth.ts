import { Router, Request, Response } from "express";

// Initialse the router
const router = Router();

// Get JWT secret
const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

// PASSKEY for admin to approve the new user
const ADMIN_PASSKEY = "Manas Poddar"

// Route - 1: Create new user
router.post('/create-user', async (req: Request, res: Response) => {

})






export default router;