/*import { IImageStorage, UploadResult } from "./image-storage.interface";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./firebaseConfig";
import { NextResponse } from "next/server";

export class FirebaseImageStorage implements IImageStorage {

  async uploadImage(
    file: File,
    folderPath: string
  ): Promise<UploadResult> {
    try {
      const path = `${folderPath}/${file.name}`;
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);
      // Determine file type and extension
      const uploadTaskPromise = new Promise<string>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Optional: Handle upload progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error("Upload failed:", error);
            reject(NextResponse.json({ error: "Upload failed" }, { status: 500 }));
          },
          async () => {
            // Upload completed successfully
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });

      const downloadURL = await uploadTaskPromise;

      return {
        url: downloadURL,
        path,
        filename: file.name,
        size: file.size,
        mimetype: file.type,
      };
    } catch (error) {
      console.error("Error uploading to Firebase:", error);
      throw new Error(`Failed to upload image: ${error}`);
    }
  }

  async uploadMultipleImages(
    files: File[],
    folderPath = "uploads"
  ): Promise<UploadResult[]> {
    const uploadPromises = files.map((file) => this.uploadImage(file, folderPath));
    return Promise.all(uploadPromises);
  }

  async deleteImage(filePath: string): Promise<boolean> {
    try {
      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);
      return true;
    } catch (error) {
      console.error("Error deleting from Firebase:", error);
      return false;
    }
  }
} */

import { bucket } from "./firebaseAdmin";
import { IImageStorage, UploadResult } from "./image-storage.interface";

export class FirebaseImageStorage implements IImageStorage {
  uploadMultipleImages(files: File[], path?: string): Promise<UploadResult[]> {
    throw new Error("Method not implemented.");
  }
  deleteImage(path: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async uploadImage(file: File, folderPath: string): Promise<UploadResult> {
    const filePath = `${folderPath}/${file.name}`;
    const fileUpload = bucket.file(filePath);

    const buffer = Buffer.from(await file.arrayBuffer());

    await fileUpload.save(buffer, {
      metadata: {
        contentType: file.type,
      },
    });

    // Hacer el archivo público
    await fileUpload.makePublic();

    const publicUrl = fileUpload.publicUrl();

    return {
      url: publicUrl,
      path: filePath,
      filename: file.name,
      size: file.size,
      mimetype: file.type,
    };
  }
}
