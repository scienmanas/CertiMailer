import express, { Express, Request, Response } from "express";
import { config } from "dotenv";
import { connectToDB } from "./config/db";
import cookieParser from "cookie-parser";

// Routes import
import certificatesRoute from "./routes/certificate";
import authRoute from "./routes/auth";
import sendEmailsRoute from "./routes/sendEmails";
import userRoute from "./routes/user";
import utilsRoute from "./routes/utils";

// Load the env
config();

// Connect to Database
connectToDB();

// Configure app
const app: Express = express();
const PORT: string = process.env.PORT || "5000";

// CORS configuration: Manually handle origins and preflight requests
const allowedOrigins = [
  "https://certimailer.xyz",
  "https://www.certimailer.xyz",
];
const allowedOriginsHitPoint = [
  "https://certimailer.xyz",
  "https://www.certimailer.xyz",
  "https://cron-job.org",
  "https://www.cron-job.org",
  "http://localhost:3000",
];
const allowedMethods = ["GET", "POST", "PUT", "DELETE"];
const allowedHeaders = ["Content-Type", "Authorization"];

app.use((req: Request, res: Response, next) => {
  const origin = req.headers.origin as string | undefined;

  if (req.url === "/") {
    if (origin && allowedOriginsHitPoint.includes(origin))
      return res.status(200).json({ message: "200 OK Hello guys :)" }).end();
  }

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
  } else {
    // If origin doesn't match, send a 403 error
    return res.status(403).json({ message: "Access denied: Not allowed" });
  }

  next();
});

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/certificate", certificatesRoute);
app.use("/api/auth", authRoute);
app.use("/api/send-email", sendEmailsRoute);
app.use("/user", userRoute);
app.use("/api/utils", utilsRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server active at port: ${PORT}`);
});
