
import { Pet, Event } from '../models/inter'
import { queryDatabase } from './db';

// Posible implementacion para getAllPets, con los eventos adentro como array (aca se llaman walks)

/*
-- GetEvents
select a.event_id, a.event_type, b.name as event_name,
	a.user as created_by, a.created_time as created_date
from event a
join event_type b on b.id = a.event_type
where 1=1
and pet_id = ${pet.pet_id}
order by a.created_time

-- GetPets
select a.pet_id, a.owner_user as owner, a.name, a.pet_type, b.type_name as type,
	a.breed_id, c.breed_name as breed, a.pet_status as status_id, d.status,
    ( select count(*) from event where pet_id = a.pet_id) as cant_events
from pet a
join pet_type b on b.id = a.pet_type
join pet_breed c on c.pet_type = a.pet_type and c.breed_id = a.breed_id
join pet_status d on d.status_id = a.pet_status
where 1=1
and (pet_id = ${pet_id} or ${pet_id} = 0)
*/

export async function getPets(pet_id: number): Promise<Pet[]> {

  pet_id = pet_id || 0

  console.log(`db getPets pet_id ${pet_id}`)

  const query = `select a.pet_id, a.owner_user as owner, a.name, a.pet_type, b.type_name as type,
	                a.breed_id, c.breed_name as breed, a.pet_status as status_id, d.status,
                  ( select count(*) from event where pet_id = a.pet_id) as cant_events
                from pet a
                join pet_type b on b.id = a.pet_type
                join pet_breed c on c.pet_type = a.pet_type and c.breed_id = a.breed_id
                join pet_status d on d.status_id = a.pet_status
                where 1=1
                and (pet_id = ${pet_id} or ${pet_id} = 0)`;

  const queryResult = await queryDatabase<Pet>(query); // Quizas haya que hacer una interface Pets + countWalks para que esto funcione, y queryDatabase<PetExtended>
  
  const pets: Pet[] = [];
  
  for (const pet of queryResult.results) {
    
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
  
    const newPet: Pet = {
      pet_id: pet.pet_id,
      owner: pet.owner,
      name: pet.name,
      pet_type: pet.pet_type,
      type: pet.type,
      breed_id: pet.breed_id,
      breed: pet.breed,
      status_id: pet.status_id,
      status: pet.status,
      cant_events: pet.cant_events,
      events: pet.events
    };

    pets.push(newPet);
    
    }
  
    return pets;
  }
 
  export default { getPets }