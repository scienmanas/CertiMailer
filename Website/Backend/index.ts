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

// connect to Database
connectToDB();

// configure app
const app: Express = express();
const PORT: string = process.env.PORT || "5000";

// CORS configuration
const corsConfiguration = {
  // origin: ["https://certimailer.xyz"],
  origin: "*",
  optionSucessStatus: 200,
};

// middleware to use import routes and enable cors
app.use(express.json());
app.use(cors(corsConfiguration));
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

// Listening at
app.listen(PORT, () => {
  console.log(`Server active at port: ${PORT}`);
  // console.log(`Server active at: http://localhost:${PORT}`);
});
