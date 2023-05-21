
import { Pet, Event, PetPhoto } from '../models/pet.model'
import { queryDatabase } from './db';

interface PetQuery extends Pet  {
  cant_events: number,
  cant_photos: number
}

export async function getPets(pet_id: number, username:string): Promise<Pet[]> {

  pet_id = pet_id || 0
  username = username || ""

  let query = `select a.pet_id, a.owner_user as owner, a.name, a.pet_type, b.type_name as type,
	                a.breed_id, c.breed_name as breed, a.pet_status as status_id, d.status, a.qr_code,
                  ( select count(*) from event where pet_id = a.pet_id) as cant_events,
                  ( select count(*) from photo where pet_id = a.pet_id and event_id = 0) as cant_photos
                from pet a
                join pet_type b on b.id = a.pet_type
                join pet_breed c on c.pet_type = a.pet_type and c.breed_id = a.breed_id
                join pet_status d on d.status_id = a.pet_status
                where 1=1
                and (pet_id = ${pet_id} or ${pet_id} = 0)`
  
  if (username !== "") {
    query += ` and (a.owner_user = "${username}" )`
  }
                 

  const queryResult = await queryDatabase<PetQuery>(query); // Quizas haya que hacer una interface Pets + countWalks para que esto funcione, y queryDatabase<PetExtended>
  
  const pets: Pet[] = [];
  

  for (const pet of queryResult.results) {
    
    // Si tiene eventos, lleno el array (CONVERTIR EN FUNCION INDEPENDIENTE Y LLENAR PHOTOS DE EVENTS)
    if (pet.cant_events > 0) {
      const eventsQuery = `select a.event_id, a.event_type, b.name as event_name, 
                                a.user as created_by, a.created_time as created_date
                              from event a
                              join event_type b on b.id = a.event_type
                              where 1=1
                              and pet_id = ${pet.pet_id}
                              order by a.created_time`;
        
      const eventsResult = await queryDatabase<Event>(eventsQuery);

      pet.events = eventsResult.results;

    }

    // Si tiene photos, lleno el array
    if (pet.cant_photos > 0) {

        const photosQuery = `select photo_id, url, main_photo, created_date
                            from photo
                            where 1=1
                            and pet_id = ${pet.pet_id}
                            and event_id = 0
                            order by created_date`
      
        const photosResult = await queryDatabase<PetPhoto>(photosQuery);

        pet.photos = photosResult.results;

    }
  
    const newPet: Pet = {
      pet_id: pet.pet_id,
      owner: pet.owner,
      name: pet.name,
      pet_type: pet.pet_type,
      type: pet.type,
      breed_id: pet.breed_id,
      breed: pet.breed,
      qr_code: pet.qr_code,
      status_id: pet.status_id,
      status: pet.status,
      //cant_events: pet.cant_events,
      events: pet.events,
      //cant_photos: pet.cant_photos,
      photos: pet.photos,
    };

    pets.push(newPet);
    
    }
  
    return pets;
}
  
async function createPet(pet: Pet): Promise<Pet> {
  const query = `INSERT INTO pet (name, owner_user) VALUES ("${pet.name}", "${pet.owner}")`;

  await queryDatabase<void>(query);

  const fetchQuery = `SELECT * FROM pet WHERE pet_id = LAST_INSERT_ID()`;

  const { results } = await queryDatabase<Pet>(fetchQuery);

  if (results.length === 0) {
    throw new Error('Failed to fetch the created pet');
  }

  return results[0];
}

 
  export default { getPets, createPet }