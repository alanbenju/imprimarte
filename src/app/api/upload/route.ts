import { NextRequest, NextResponse } from 'next/server';
import { storage } from './firebaseConfig'; // Adjust import path as needed
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Create a reference to the storage location
    const storageRef = ref(storage, `uploads/${file.name}`);

    // Use uploadBytesResumable to handle the file upload
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: Handle upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error('Upload failed:', error);
          reject(NextResponse.json({ error: 'Upload failed' }, { status: 500 }));
        },
        async () => {
          // Upload completed successfully
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(NextResponse.json({ downloadURL }));
        }
      );
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
}
