import db from '../db/pet.db'
import { Pet, InsertPetDto, UpdatePetDto } from '../models/pet.model'

const getPets =  async (pet_id: number, username:string, pet_type:number, breed_id: number, pet_status: number) : Promise<Pet[]> => {

    const pets = await db.getPets(pet_id, username, pet_type, breed_id, pet_status)

    return pets

}

const createPet = async (pet:InsertPetDto): Promise<Pet> => {
    
    const createdPet = await db.createPet(pet)
    return createdPet

}

const updatePet = async (pet_id: number, pet:UpdatePetDto): Promise<Pet> => {

    const updatedPet = await db.updatePet(pet_id, pet)
    return updatedPet
    
}

export default { getPets, createPet, updatePet }