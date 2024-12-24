import { Storage } from "@google-cloud/storage";

// Initialize the Google Cloud client
const bucketName = process.env.G_BUCKET_NAME as string;
const storage = new Storage({
  keyFilename: "keys.json",
  projectId: process.env.G_PROJECT_ID,
});

// Delete a file or folder
export async function deleteFile(folderName: string, fileName: string) {
  if (folderName === "" || fileName === "") {
    return {
      status: 400,
      message: "Bad Request",
    };
  }

  try {
    const bucket = storage.bucket(bucketName);
    const filePath = `${folderName}/${fileName}`;
    await bucket.file(filePath).delete();
    console.log(`File deleted successfully: ${filePath}`);
    return {
      status: 200,
      message: "File deleted",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

// Upload a file
export async function uploadFile({
  folderName,
  fileName,
  localFilePath,
}: {
  folderName: string;
  fileName: string;
  localFilePath: string;
}) {
  if (!folderName || !localFilePath) {
    return {
      status: 400,
      message: "Bad Request: Folder name and file path are required",
    };
  }

  try {
    const bucket = storage.bucket(bucketName);
    const filePath = `${folderName}/${fileName}.png`;
    await bucket.upload(localFilePath, {
      destination: filePath,
    });

    let publicUrl = "";
    publicUrl = `https://storage.googleapis.com/${bucketName}/${filePath}`;
    return {
      status: 200,
      message: "File uploaded successfully",
      publicUrl: publicUrl,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}

// Create a folder
export async function createFolder({
  folderPath,
  folderName,
}: {
  folderPath: string | null;
  folderName: string;
}) {
  if (!folderName) {
    console.log("Folder name is empty, returning error");
    return {
      status: 400,
      message: "Bad Request",
    };
  }

  try {
    const bucket = storage.bucket(bucketName);
    let file;
    // Check if folderPath exists and set file path
    if (folderPath) file = bucket.file(`${folderPath}/${folderName}/.keep`);
    else file = bucket.file(`${folderName}/.keep`);
    // Attempt to save an empty file (to simulate folder creation)
    await file.save(Buffer.from(""));
    return {
      status: 200,
      message: "Folder created",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}
