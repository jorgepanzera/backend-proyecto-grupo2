import db from '../db/pet.db'
import { Pet } from '../models/inter'

const getPets =  async (pet_id: number) : Promise<Pet[]> => {

    console.log("service getAllPets")
    const pets = await db.getPets(pet_id)

    return pets

}

export default { getPets }