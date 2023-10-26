import db from "../db/photo.db";
import { PetPhoto, EventPhoto } from "../models/pet.model";
import { User } from "../models/user.model";
import { handleFileUpload } from "../middleware/storage.middle";
import multer from "multer";

/*
const createPetPhoto = async (pet_id: number, photos: Express.Multer.File[]):Promise<PetPhoto[]> => {

    let photoUrl: string
    let resultUrl: string
    let petPhoto: PetPhoto
    let petPhotos : PetPhoto[] = []

    photos.forEach(async photo => {
        resultUrl = await handleFileUpload(photo);
        petPhoto = await db.createPetPhoto(pet_id, resultUrl)
        console.log(`forEach ${petPhoto}`)
        petPhotos.push(petPhoto)
    });
    
    console.log(`return service photo ${petPhotos}`)
    return petPhotos
    
}
*/

/* Procesar todas las fotos del array, primero obtener url desde el cloud storage (handleFileUpload), 
luego guardar en BD (createPetPhoto) */
const createPetPhoto = async ( pet_id: string,  photos: Express.Multer.File[]): Promise<PetPhoto[]> => {
  const petPhotos: PetPhoto[] = await Promise.all(
    photos.map(async (photo) => {
      const resultUrl = await handleFileUpload(photo);
      const createdPhoto = await db.createPetPhoto(pet_id, resultUrl);
      return createdPhoto;
    })
  );

  return petPhotos;
};

const createUserPhoto = async ( username: string,  photos: Express.Multer.File[]): Promise<User[]> => {
  const userPhotos: User[] = await Promise.all(
    photos.map(async (photo) => {
      const resultUrl = await handleFileUpload(photo);
      const createdPhoto = await db.createUserPhoto(username, resultUrl);
      return createdPhoto;
    })
  );

  return userPhotos;
};

export default { createPetPhoto, createUserPhoto };
