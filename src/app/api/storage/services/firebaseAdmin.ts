// firebaseAdmin.ts
import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import * as serviceAccount from "./service-account.json";

initializeApp({
  credential: cert(serviceAccount as any),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const bucket = getStorage().bucket();

export { bucket };
