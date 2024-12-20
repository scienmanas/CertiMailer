import { Router, Request, Response } from "express";
import Newsletter from "../../models/newsletter";
import User from "../../models/user";
import { protectUserRoutes } from "../../middlewares/protectRoutes";
import { sendMail } from "../../helpers/mailer";
import { ObjectId } from "mongoose";

interface CustomRequest extends Request {
  userId?: ObjectId;
}
// Make router
const router = Router();

router.post("/create", async (req: Request, res: Response) => {});

router.post("/delete", async (req: Request, res: Response) => {});

// Route - 3 : Send the data of user to frontend dasnboard
router.get(
  "/home-data",
  protectUserRoutes,
  async (req: CustomRequest, res: Response) => {
    const userId = req?.userId;
    try {
      const user = await User.findById({ _id: userId });
      if (!user) return res.status(404).json({ message: "User not found" });
      // Return the data for homepage for user
      return res.status(200).json({
        data: {
          name: user.name,
          email: user.email,
          logoUrl: user.logoUrl,
          status: user.status,
          type: user.type,
          about: user.about,
          maxAllocatedEvents: user.maxAllocatedEvents,
          totalEvents: user.totalEvents,
          AllocatedEmails: user.AllocatedEmails,
          date: user.date,
        },
        message: "User data fetched successfully",
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// Route - 4 : Add user to newsletter
router.post("/newsletter", async (req: Request, res: Response) => {
  // Get the body
  const { email } = req.body;
  try {
    // Check if user already exists
    const user = await Newsletter.findOne({ email: email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    // insert data
    const data = await Newsletter.create({ email: email });
    res.status(201).json({ message: "Successfully added user to waitlist" });
    await sendMail({
      fromName: "Manas",
      toEmail: email,
      message:
        "Hi there! ✨\n\nThank you so much for subscribing to the newsletter—you're amazing! 🤩 Just a quick note to let you know that your subscription has been successfully added.\n\nEven though this is an automated email sent from the server, I personally crafted this template, so it’s more than just a system message 😉. I’m super excited to share updates, insights, and stories with you in the upcoming newsletters.\n\nFeel free to reply to this email if you ever have any questions or feedback—I check my inbox regularly 📬 and love connecting with awesome people like you!\n\nAlright, that’s all for now! Stay tuned for some exciting content heading your way. Until then, take care and cheers! 🥂\n\n--\n\nManas Poddar\n📧 Email: manas@certimailer.xyz\n🐙 Github: https://github.com/scienmanas\n🌐 Web: https://scienmanas.xyz",
      subject: "Subscribed to Newsletter 💌",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
