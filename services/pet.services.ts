import db from '../db/pet.db'
import { Pet, InsertPetDto } from '../models/pet.model'

const getPets =  async (pet_id: number, username:string, pet_type:number, breed_id: number) : Promise<Pet[]> => {

    const pets = await db.getPets(pet_id, username, pet_type, breed_id)

    return pets

}

const createPet =async (pet:InsertPetDto): Promise<Pet> => {
    
    const createdPet = db.createPet(pet)
    return createdPet

}

export default { getPets, createPet }