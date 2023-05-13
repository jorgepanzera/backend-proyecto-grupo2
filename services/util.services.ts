import db from '../db/util.db'
import { PetType, PetBreed } from '../models/util.model'

const getPetTypes =  async () : Promise<PetType[]> => {
    
    const petTypes = await db.getPetTypes()

    return petTypes

}

const getPetBreeds =  async (pet_type:number) : Promise<PetBreed[]> => {

    const petBreeds = await db.getPetBreeds(pet_type)

    return petBreeds

}

export default { getPetTypes , getPetBreeds }