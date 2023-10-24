import db from '../db/pet.db';
import { Pet, InsertPetDto, UpdatePetDto } from '../models/pet.model';
import { generateUUID } from '../utils/generate_uuid';
import { generateQRCode } from '../utils/generate_qr';

const getPets =  async (pet_id: number, username:string, pet_type:number, breed_id: number, pet_status: number) : Promise<Pet[]> => {

    const pets = await db.getPets(pet_id, username, pet_type, breed_id, pet_status);

    return pets;

}

const createPet = async (pet:InsertPetDto): Promise<Pet> => {
    
    //const pet_id = generateUUID();
    //const qr_code = await generateQRCode(pet_id);
    //const petWithUUID = { ...pet, pet_id, qr_code};

    //const createdPet = await db.createPet(petWithUUID);

    const createdPet = await db.createPet(pet)
    return createdPet;

}

const updatePet = async (pet_id: string, pet:UpdatePetDto): Promise<Pet> => {

    const updatedPet = await db.updatePet(pet_id, pet);
    return updatedPet;
    
}

const deletePet = async (pet_id: string): Promise<void> => {

    await db.deletePet(pet_id);
    return; 
    
}

export default { getPets, createPet, updatePet, deletePet }