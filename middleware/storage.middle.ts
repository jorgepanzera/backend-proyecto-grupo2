import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import { Express, Request } from 'express';
// This is a hack to make Multer available in the Express namespace
import { Multer } from 'multer';
type File = Express.Multer.File;


// ...

// Helper function to handle file uploads (using Google Cloud Storage)
export const handleFileUpload = (file: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Provide your Google Cloud Storage credentials path or object
    console.log('storage')

    const storage = new Storage({
      keyFilename: './.googlecredentials.json',
    });


    // Get a reference to your Google Cloud Storage bucket
    const bucket = storage.bucket('mapet_backend_bucket');
    //console.log(bucket)

    // Generate a unique filename for the file
    const filename = `${uuidv4()}-${file.originalname}`;

    // Set the Google Cloud Storage file options
    const fileOptions = {
      destination: filename,
      publicRead: true, // Set the desired access control for the uploaded file
    };

    // Upload the file to Google Cloud Storage
    bucket.upload(file.path, fileOptions, (err: any, uploadedFile: any) => {
      if (err) {
        console.log(err)
        reject(err);
      } else {
        // Resolve with the file URL
        //console.log(uploadedFile)
        resolve(uploadedFile.publicUrl());
      }
    });
  });
};

//export default {handleFileUpload}