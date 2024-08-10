import express, { Express, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectToDB } from "./config/db";
// Routes import
import certificatesRoute from "./routes/certificate.ts";
import authRoute from "./routes/auth.ts";

// Load the env
config();

// connect to Database
connectToDB();

// configure app
const app: Express = express();
const PORT: string = process.env.PORT || "5000";

// CORS configuration
const corsConfiguration = {
  origin: ["https://certimailer.xyz"],
  // origin: ["*"],
  optionSucessStatus: 200,
};

// middleware to use import routes and enable cors
app.use(express.json());
app.use(cors(corsConfiguration));

// Routes
app.use("/api/certificate", certificatesRoute);
app.use("/api/auth", authRoute);

// Landing endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "200 OK :)" });
});

// Listening at
app.listen(PORT, () => {
  console.log(`Server active at port: ${PORT}`);
  console.log(`Server active at: http://localhost:${PORT}`);
});
