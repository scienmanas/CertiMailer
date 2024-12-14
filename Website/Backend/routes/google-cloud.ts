// import { Router, Response, Request } from "express";
// import { Storage } from "@google-cloud/storage";
// import multer from "multer";

// // Define Router
// const router = Router();

// // Use memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Bucket configuration
// const bucketName = "certimailer";
// const storageClient = new Storage();

// router.post(
//   "/logo",
//   upload.single("logo"),
//   async (req: Request, res: Response) => {
//     // Get the file name to be put
//     const { fileName } = req.body;

//     // Access the file
//     const file = req.file?.buffer;

//     // Change the name of file
//     const destFileName = `organization_logos/${fileName}`;
//     const filePath = file;

//     const options = {
//       destination: destFileName,
//     };

//     // Upload the file to the bucket
//     await bucket.upload(filePath, options);
//   }
// );

// router.delete("/logo", async (req: Request, res: Response) => {});

// export default router;
