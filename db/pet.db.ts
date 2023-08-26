
import { Pet, Event, PetPhoto, InsertPetDto, UpdatePetDto } from '../models/pet.model'
import {UpdateUserDto} from '../models/user.model'
import { Cantidad } from '../models/util.model';
import { queryDatabase, QueryResult } from './db';

// Para GetPetsById y GetPetsByUser
interface PetQuery extends Pet  {
  cant_events: number,
  cant_photos: number
}

// Para GetPetsById y GetPetsByUser
export async function getPets(pet_id: number, username: string, pet_type: number, breed_id:number, pet_status: number): Promise<Pet[]> {
  
  // TODO filtro por tipo mascota y raza (pet_type and breed)

  pet_id = pet_id || 0
  username = username || ""
  pet_type = pet_type || 0
  breed_id = breed_id || 0
  pet_status = pet_status || 0


  let query = `select a.pet_id, a.owner_user as owner, a.name, a.pet_type, b.type_name as type,
	                a.breed_id, c.breed_name as breed, a.pet_status as status_id, d.status, a.qr_code, a.age,
                  ( select count(*) from event where pet_id = a.pet_id) as cant_events,
                  ( select count(*) from photo where pet_id = a.pet_id and event_id = 0) as cant_photos
                from pet a
                join pet_type b on b.id = a.pet_type
                join pet_breed c on c.pet_type = a.pet_type and c.breed_id = a.breed_id
                join pet_status d on d.status_id = a.pet_status
                where 1=1
                and (pet_id = ${pet_id} or ${pet_id} = 0)
                and (pet_status = ${pet_status} or ${pet_status} = 0)
                and (a.pet_type = ${pet_type} or ${pet_type} = 0)
                and (a.breed_id = ${breed_id} or ${breed_id} = 0)`
  
  if (username !== "") {
    query += ` and (a.owner_user = "${username}" )`
  }
                 

  const queryResult = await queryDatabase<PetQuery>(query); 
  
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

      let photosQuery = `select photo_id, url, main_photo, created_date
                            from photo
                            where 1=1
                            and pet_id = ${pet.pet_id}
                            and event_id = 0`
      if (pet_id == 0) {
        photosQuery += ` and main_photo = 1` // si no es consulta especifica por pet_id, traigo solo la foto principal   
      }
      photosQuery += ` order by created_date`
   
      
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
      age: pet.age,
      //cant_events: pet.cant_events,
      events: pet.events,
      //cant_photos: pet.cant_photos,
      photos: pet.photos,
    };

    pets.push(newPet);
    
    }
  
    return pets;
}
  
async function createPet(pet: InsertPetDto): Promise<Pet> {

  // Traer datos del owner para formar el QR
  const queryUser = `SELECT email, mobile_number from user where username = "${pet.owner_user}"`

  let userResult: QueryResult<UpdateUserDto> = await queryDatabase<UpdateUserDto>(queryUser)

  if (userResult.results.length === 0) {
    throw new Error('Error obteniendo datos de usuario para formar QR');
  }

  const qr_code = pet.owner_user + "-" + userResult.results[0].email + "-" + userResult.results[0].mobile_number

  // Verificar que existe breed_id para el type de la mascota
  const queryBreedType = `select count(*) as cant from pet_breed where breed_id = ${pet.breed_id} and pet_type = ${pet.pet_type}`

  let breedResult: QueryResult<Cantidad> = await queryDatabase<Cantidad>(queryBreedType)
  
  if (breedResult.results[0].cant === 0) {
    throw new Error('Error no existe breed_id para el pet_type ingresado');
  }

  // Dar de alta la mascota
  const query = `INSERT INTO pet (name, owner_user, pet_type, breed_id, qr_code, pet_status, age)
                  VALUES("${pet.name}", "${pet.owner_user}", ${pet.pet_type}, ${pet.breed_id}, "${qr_code}", ${pet.pet_status}, ${pet.age})`

  await queryDatabase<void>(query);

  // Devolver la mascota ingresada
  const fetchQuery = `SELECT a.pet_id, a.owner_user as owner, a.name, a.pet_type, b.type_name as type,
	                    a.breed_id, c.breed_name as breed, a.pet_status as status_id, d.status, a.qr_code, a.age
                    FROM pet a
                    JOIN pet_type b on b.id = a.pet_type
                    JOIN pet_breed c on c.pet_type = a.pet_type and c.breed_id = a.breed_id
                    JOIN pet_status d on d.status_id = a.pet_status
                    WHERE a.pet_id = LAST_INSERT_ID()`;
                

  const { results } = await queryDatabase<Pet>(fetchQuery);

  if (results.length === 0) {
    throw new Error('Failed to fetch the created pet');
  }

  return results[0];
}

async function updatePet(pet_id: number, pet: UpdatePetDto): Promise<Pet> {

  let moreThanOneData:boolean = false

  // Actualizar la mascota

  if (pet.name || pet.breed_id || pet.pet_status || pet.age) {

    let queryUpdate = `UPDATE pet SET `
    if (pet.pet_status) {
     queryUpdate += ` pet_status = ${pet.pet_status}`
     moreThanOneData = true
    }
    if (pet.breed_id) {
      if (moreThanOneData) {
        queryUpdate += `,  `
      }
     queryUpdate += ` breed_id = ${pet.breed_id}`
     moreThanOneData = true
    }
    if (pet.name) {
      if (moreThanOneData) {
        queryUpdate += `,  `
      }      
     queryUpdate += ` name = "${pet.name}"`
     moreThanOneData = true
    }
    if (pet.age) {
      if (moreThanOneData) {
        queryUpdate += `,  `
      }      
     queryUpdate += ` age = ${pet.age}`
     moreThanOneData = true
    }
    queryUpdate += ` WHERE pet_id = ${pet_id}`

    await queryDatabase<void>(queryUpdate);

  }



  // Devolver la mascota actualizada
  const fetchQuery = `SELECT a.pet_id, a.owner_user as owner, a.name, a.pet_type, b.type_name as type,
	                    a.breed_id, c.breed_name as breed, a.pet_status as status_id, d.status, a.qr_code, a.age
                    FROM pet a
                    JOIN pet_type b on b.id = a.pet_type
                    JOIN pet_breed c on c.pet_type = a.pet_type and c.breed_id = a.breed_id
                    JOIN pet_status d on d.status_id = a.pet_status
                    WHERE a.pet_id = ${pet_id}`;
                

  const { results } = await queryDatabase<Pet>(fetchQuery);


  if (results.length === 0) {
    throw new Error('Failed to fetch the updated pet');
  }

  return results[0];  
  
}

export async function deletePet(pet_id: number): Promise<void> {
  
    // Verificar si existe mascota para borrar
    const findQuery = `SELECT * FROM pet WHERE pet_id = ${pet_id}`;

    let petResult: QueryResult<Pet> = await queryDatabase<Pet>(findQuery)
  
    if (petResult.results.length === 0) {
      throw new Error('No encontre mascota para borrar');
    }
  
  try {
    const deleteQuery = `DELETE FROM pet WHERE pet_id = ${pet_id}`;
    await queryDatabase<void>(deleteQuery);
  } catch (error) {
    throw error;
  }
}


 
 export default { getPets, createPet, updatePet, deletePet }