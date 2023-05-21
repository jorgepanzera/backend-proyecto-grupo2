import {queryDatabase} from './db'
import {PetPhoto} from '../models/pet.model'

async function createPetPhoto(pet_id: number, photoUrl:string): Promise<PetPhoto> {

    let main_photo: number

    // Me fijo si es la primer foto, si es la primera, la marco como main photo
    const queryFirst = `SELECT COUNT(*) FROM photo where pet_id = ${pet_id} and event_id = 0 and main_photo = 1`

    const queryFirstResult = await queryDatabase<{ count: number }>(queryFirst);
  
    const countFirsPhoto = queryFirstResult.results[0].count;


    console.log(`countFirstPhoto ${countFirsPhoto}`)

    if (countFirsPhoto > 0) {
        main_photo = 1
    } else {
        main_photo = 0
    }

    console.log(`main photo ${main_photo}`)

    // Insertar Foto
    const query = `INSERT INTO photo (pet_id, event_id, main_photo, url) VALUES
                    (${pet_id}, 0,${main_photo},"${photoUrl}")`
  
    await queryDatabase<void>(query);
  
    // Fetch the newly created photo
     const fetchQuery = `SELECT * FROM photo WHERE photo_id = LAST_INSERT_ID()`;
    const { results } = await queryDatabase<PetPhoto>(fetchQuery);
    
        if (results.length === 0) {
          throw new Error('Photo not found'); // Throw an error if the user was not found
        }
  
    return results[0];
}
  
export default {createPetPhoto}