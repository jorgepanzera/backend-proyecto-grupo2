import { PetPhoto } from '../models/pet.model'
import { NextFunction, Request, Response } from 'express';
import service from '../services/photo.services'


const uploadPetImage = async (req: Request, res: Response, next: NextFunction) => { 
    const targetPet = req.params.id;

  console.log(targetPet)
  console.log(req.files)

  const petId = Number(targetPet)
  
    if (!req.files || !Array.isArray(req.files)) {
      // Handle the case when req.files is not defined or not an array
      return res.status(400).json({ error: 'No files were uploaded.' });
    }
  
    const files: Express.Multer.File[] = req.files;
  
  try {
      service.createPetPhoto(petId,files)
      /*
      const fileUrls = await Promise.all(files.map((file: Express.Multer.File) => handleFileUpload(file)));
  
      // fileUrls va a tener las url de cada imagen subida
      console.log(fileUrls);
      // aqui llamar a services y guardar en bd las imagenes para la mascota
  
      return res.json(fileUrls); // el return debe venir de services con la interface photo
      */
    } catch (error) {
      // Handle the error case
      return res.status(500).json({ error: 'Failed to upload files.' });
    }
  
}
  
export default {uploadPetImage}