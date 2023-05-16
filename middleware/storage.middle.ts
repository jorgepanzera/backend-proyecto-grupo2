import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import { Express, Request } from 'express';
// This is a hack to make Multer available in the Express namespace
import { Multer } from 'multer';
type File = Express.Multer.File;


// ...

// Helper function to handle file uploads (using Google Cloud Storage)
const handleFileUpload = (file: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Provide your Google Cloud Storage credentials path or object
    const storage = new Storage({
      credentials: {
        client_email: 'backendgrupo2@gmail.com',
        private_key: 'Backend2023',
      },
    });

    // Get a reference to your Google Cloud Storage bucket
    const bucket = storage.bucket('mapet_backend_bucket');

    // Generate a unique filename for the file
    const filename = `${uuidv4()}-${file.originalname}`;

    // Set the Google Cloud Storage file options
    const fileOptions = {
      destination: filename,
      public: true, // Set the desired access control for the uploaded file
    };

    // Upload the file to Google Cloud Storage
    bucket.upload(file.path, fileOptions, (err: any, uploadedFile: any) => {
      if (err) {
        reject(err);
      } else {
        // Resolve with the file URL
        resolve(uploadedFile[0].publicUrl());
      }
    });
  });
};

export default {handleFileUpload}