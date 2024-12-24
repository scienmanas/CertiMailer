import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save files temporarily
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique file name
  },
});

// Max limit for multer file size
export const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 50 }, // File size limit = 50MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "text/csv"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only images/csv are allowed are allowed"));
    }
    cb(null, true);
  },
});
