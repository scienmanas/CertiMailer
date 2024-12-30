import { config } from "dotenv";

// Load the environment variables
config();

import express, { Express, Request, Response } from "express";
import { connectToDB } from "./config/db";
import { registerFonts } from "./config/RegisterFonts";
import cookieParser from "cookie-parser";
import fs from "fs";
// Routes import
import idRoute from "./routes/id/id";
import authRoute from "./routes/user/auth";
import userRoute from "./routes/user/user";
import otpRoute from "./routes/utils/otp";
// Cron jobs
import deleteOtp from "./cron-jobs/delete-otp";

// Connect to Database
console.log(`Environment: ${process.env.ENV as string}`);
connectToDB();

// Register Fonts
registerFonts();

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
  console.log("Created uploads directory");
}

// Configure app
const app: Express = express();
const PORT: string = process.env.PORT || "5000";

// CORS configuration: Manually handle origins and preflight requests
const allowedOrigins = [
  "https://certimailer.xyz",
  "https://www.certimailer.xyz",
];
const allowedDevOrigin = "http://localhost:3000";
const allowedMethods = ["GET", "POST", "PUT", "DELETE"];
const allowedHeaders = ["Content-Type", "Authorization"];

app.use((req: Request, res: Response, next) => {
  const origin = req.headers.origin as string | undefined;

  if (req.url === "/")
    return res
      .status(200)
      .json({ message: "CertiMailer server on fire :)" })
      .end();

  if (process.env.ENV === "dev") {
    res.setHeader("Access-Control-Allow-Origin", origin || allowedDevOrigin);
    res.setHeader("Access-Control-Allow-Methods", allowedMethods.join(", "));
    res.setHeader("Access-Control-Allow-Headers", allowedHeaders.join(", "));
    res.setHeader("Access-Control-Allow-Credentials", "true");

    return next();
  } else if (process.env.ENV === "prod" || process.env.ENV === "test") {
    if (origin && allowedOrigins.includes(origin)) {
      // Allow the origin if it's in the allowedOrigins list
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", allowedMethods.join(", "));
      res.setHeader("Access-Control-Allow-Headers", allowedHeaders.join(", "));
      res.setHeader("Access-Control-Allow-Credentials", "true");

      // Handle preflight requests (OPTIONS)
      if (req.method === "OPTIONS") {
        return res.status(200).end();
      }
    }
  } else {
    // If origin doesn't match, send a 403 error
    return res.status(403).json({ message: "Access denied: Not allowed" });
  }

  next();
});

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/id", idRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/utils", otpRoute);

// Cron jobs
console.log("Cron Job Activates :)");
deleteOtp();

// Start server
app.listen(PORT, () => {
  console.log(`Server active at port: ${PORT}`);
});
