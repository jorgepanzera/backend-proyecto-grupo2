import { NextFunction, Request, Response } from 'express';
import { Pet, InsertPetDto, UpdatePetDto } from '../models/pet.model'
import service from '../services/pet.services'
import { validate } from 'class-validator';


const getAllPets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json(await service.getPets(0,"",0,0))

  } catch (error) {
    next(error);
  }
}


const getPetById = async (req: Request, res: Response, next: NextFunction) => {
  const targetId = parseInt(req.params.id)
  
  try {
    return res.json(await service.getPets(targetId,"",0,0))

  } catch (error) {
    next(error);
  }
}

const getPetsByUser = async (req: Request, res: Response, next: NextFunction) => {
  const targetUser = req.params.user
  
  try {
    return res.json(await service.getPets(0,targetUser,0,0))

  } catch (error) {
    next(error);
  }
}

const getPetsByTypeBreed = async (req: Request, res: Response, next: NextFunction) => {
  const targetType = parseInt(req.params.type)
  const targetBreed = parseInt(req.params.breed)
  
  try {
    return res.json(await service.getPets(0,"",targetType,targetBreed))

  } catch (error) {
    next(error);
  }
}



const createPet = async (req: Request, res: Response, next: NextFunction) => { 

  const petData: InsertPetDto = req.body;

  try {
    
    // Create a new instance of InsertPetDto para validar
    let petInsert = new InsertPetDto();
    petInsert.name = petData.name;
    petInsert.owner_user = petData.owner_user;
    petInsert.pet_type = petData.pet_type;
    petInsert.breed_id = petData.breed_id;

    // Validar datos de entrada
    const errors = await validate(petInsert);
    if (errors.length > 0) {
      // Errores de validacion
      return res.status(400).json({ errors: errors.map((error) => error.toString()) });
    }  else {
      // si paso validaciones de input, voy a crearlo en bd
      const pet = await service.createPet(petInsert)
      return res.status(200).send(pet)
    }
  } catch(error) {
    next(error)
  }

}


const updatePet = async (req: Request, res: Response, next: NextFunction) => {

  const petId = parseInt(req.params.id)
  const petData: UpdatePetDto = req.body;

  try {
    
    /*
    // Create a new instance of InsertPetDto para validar
    let petInsert = new InsertPetDto();
    petInsert.name = petData.name;
    petInsert.owner_user = petData.owner_user;
    petInsert.pet_type = petData.pet_type;
    petInsert.breed_id = petData.breed_id;
    */

    // Validar datos de entrada
    const errors = await validate(petData);
    if (errors.length > 0) {
      // Errores de validacion
      return res.status(400).json({ errors: errors.map((error) => error.toString()) });
    }  else {
      // si paso validaciones de input, voy a actualizarlo en bd
      const pet = await service.updatePet(petId,petData)
      return res.status(200).send(pet)
    }
  } catch(error) {
    next(error)
  }

}

const deletePet = (req: Request, res: Response, next: NextFunction) => {
    const targetId = parseInt(req.params.id)
  res.json({ targetId })
}

export default {getAllPets, getPetById, getPetsByUser, createPet, updatePet, deletePet, getPetsByTypeBreed}

