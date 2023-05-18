import { Photo } from '../models/pet.model'
import { NextFunction, Request, Response } from 'express';
import service from '../services/pet.services'
import { handleFileUpload } from '../middleware/storage.middle'
import multer from 'multer';


const uploadPetImage = async (req: Request, res: Response, next: NextFunction) => { 
    const targetPet = req.params.id;

  console.log(targetPet)
  console.log(req.files)
  
    if (!req.files || !Array.isArray(req.files)) {
      // Handle the case when req.files is not defined or not an array
      return res.status(400).json({ error: 'No files were uploaded.' });
    }
  
    const files: Express.Multer.File[] = req.files;
  
    try {
      const fileUrls = await Promise.all(files.map((file: Express.Multer.File) => handleFileUpload(file)));
  
      // fileUrls will contain an array of URLs of the uploaded files
      console.log(fileUrls);
      // ... your logic here
  
      return res.json(fileUrls);
    } catch (error) {
      // Handle the error case
      return res.status(500).json({ error: 'Failed to upload files.' });
    }
  
}
  
export default {uploadPetImage}