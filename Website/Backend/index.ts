import express, { Express, Request, Response } from "express";
import cors from "cors";
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

// CORS configuration: Allow only your domain
const allowedOrigins = ["https://certimailer.xyz"];
const allowedHosts = ["certimailer.xyz"];

// Use CORS with the specified options
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const host = req.headers.host;
  console.log(origin);
  console.log(host);
  if (
    origin &&
    allowedOrigins.includes(origin) &&
    host &&
    allowedHosts.includes(host)
  ) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  } else {
    res.status(403).json({ message: "Access denied: Not allowed" });
  }
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

// Landing endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "200 OK Hello guys :)" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server active at port: ${PORT}`);
});
