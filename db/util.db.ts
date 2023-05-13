import { queryDatabase } from "./db";
import { PetType, PetBreed } from "../models/util.model";

async function getPetTypes(): Promise<PetType[]> {

let query = `SELECT id as type_id, type_name from pet_type`;

  const queryResult = await queryDatabase<PetType>(query);

  const petTypes: PetType[] = [];

  for (const petType of queryResult.results) {
    const newPetType: PetType = {
      type_id: petType.type_id,
      type_name: petType.type_name,
    };

    petTypes.push(newPetType);
  }

  return petTypes;
}

async function getPetBreeds(pet_type: number): Promise<PetBreed[]> {

  let query = `SELECT breed_id, pet_type, breed_name FROM pet_breed where pet_type = ${pet_type}`;

  const queryResult = await queryDatabase<PetBreed>(query);

  const petBreeds: PetBreed[] = [];

  for (const breed of queryResult.results) {
    const newPetBreed: PetBreed = {
      breed_id: breed.breed_id,
      pet_type: breed.pet_type,
      breed_name: breed.breed_name,
    };

    petBreeds.push(newPetBreed);
  }

  return petBreeds;
}

export default {getPetBreeds, getPetTypes}