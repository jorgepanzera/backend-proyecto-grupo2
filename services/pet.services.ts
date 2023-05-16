import db from '../db/pet.db'
import { Pet } from '../models/pet.model'

const getPets =  async (pet_id: number, username:string) : Promise<Pet[]> => {

    const pets = await db.getPets(pet_id, username)

    return pets

}

export default { getPets }