import { PetPhoto } from "../models/pet.model";
import { NextFunction, Request, Response } from "express";
import service from "../services/photo.services";

const uploadPetImage = async (  req: Request,  res: Response,  next: NextFunction) => {
  try {
    const targetPet = req.params.id;

    const petId = Number(targetPet);

    if (!req.files || !Array.isArray(req.files)) {
      // Handle the case when req.files is not defined or not an array
      return res.status(400).json({ error: "No files were uploaded." });
    }

    const files: Express.Multer.File[] = req.files;

    const petPhotos = await service.createPetPhoto(petId, files);
    return res.json(petPhotos);

  } catch (error) {
    // Handle the error case
    return res.status(500).json({ error: "Failed to upload files." });
  }
};


const uploadUserImage = async (req: Request,  res: Response,  next: NextFunction) => {
  try {
    const targetUser = req.params.id;

    if (!req.files || !Array.isArray(req.files)) {
      // Handle the case when req.files is not defined or not an array
      return res.status(400).json({ error: "No files were uploaded." });
    }

    const files: Express.Multer.File[] = req.files;

    if (req.files.length > 1) {
      return res.status(400).json({ error: "Only one profile image allowed" });
    }

    const userPhotos = await service.createUserPhoto(targetUser, files);
    return res.json(userPhotos);

  } catch (error) {
    // Handle the error case
    return res.status(500).json({ error: "Failed to upload files." });
  }
};

export default { uploadPetImage, uploadUserImage };
