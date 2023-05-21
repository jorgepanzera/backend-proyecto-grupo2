import db from '../db/photo.db'
import { PetPhoto, EventPhoto } from '../models/pet.model'
import { handleFileUpload } from '../middleware/storage.middle'
import multer from 'multer';

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

/* HACER UN createPetPhoto de a una sola foto, sino no se resuelven los promises */
const createPetPhoto = async (pet_id: number, photos: Express.Multer.File[]): Promise<PetPhoto[]> => {
    const petPhotos: PetPhoto[] = await Promise.all(
      photos.map(async (photo) => {
          const resultUrl = await handleFileUpload(photo);
          console.log(`tengo url ${resultUrl}`)
          const createdPhoto = await db.createPetPhoto(pet_id, resultUrl);
          console.log(`tengo PetPhoto ${createdPhoto.photo_id}`)
        return createdPhoto;
      })
    );
  
    console.log('salgo de services photo')
    return petPhotos;
  };


export default { createPetPhoto }

