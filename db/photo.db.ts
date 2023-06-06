import {queryDatabase} from './db'
import { PetPhoto } from '../models/pet.model'
import { User } from '../models/user.model';

async function createPetPhoto(pet_id: number, photoUrl:string): Promise<PetPhoto> {

    let main_photo: number

    // Me fijo si es la primer foto de la mascota pet_id, si es la primera, la marco como main photo
    const queryFirst = `SELECT COUNT(*) AS count FROM photo WHERE pet_id = ${pet_id} AND event_id = 0 AND main_photo = 1`;
    const queryFirstResult = await queryDatabase<{ count: number }>(queryFirst);
    
    const countMainPhoto: number = queryFirstResult.results[0].count;
    
    if (countMainPhoto > 0) {
        main_photo = 0 // ya habia mas fotos para ese pet_id
    } else {
        main_photo = 1 // es la primer foto
    }

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


async function createUserPhoto(username: string, photoUrl:string): Promise<User> {

    // Insertar Foto
    const query = `UPDATE user SET photo_url = "${photoUrl} WHERE username = "${username}"`
  
    await queryDatabase<void>(query);
  
    // Fetch the updated User
    const fetchQuery = `SELECT * FROM user WHERE username = "${username}"`
    const { results } = await queryDatabase<User>(fetchQuery);
    
    if (results.length === 0) {
        throw new Error('Photo not found'); // Throw an error if the user was not found
    }
  
    return results[0];
}
  
export default {createPetPhoto, createUserPhoto}