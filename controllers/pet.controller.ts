import { NextFunction, Request, Response } from 'express';
import { Pet, InsertPetDto, UpdatePetDto } from '../models/pet.model'
import service from '../services/pet.services'
import photoService from "../services/photo.services";
import { validate } from 'class-validator';


const getAllPets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json(await service.getPets("","",0,0,0));

  } catch (error) {
    next(error);
  }
}


const getPetsByStatus = async (req: Request, res: Response, next: NextFunction) => {
  const targetStatus = parseInt(req.params.pet_status);
  
  try {
    return res.json(await service.getPets("","",0,0,targetStatus));

  } catch (error) {
    next(error);
  }
}


const getPetById = async (req: Request, res: Response, next: NextFunction) => {
  const targetId = req.params.id;
  
  try {
    return res.json(await service.getPets(targetId,"",0,0,0));

  } catch (error) {
    next(error);
  }
}

const getPetsByUser = async (req: Request, res: Response, next: NextFunction) => {
  const targetUser = req.params.user
  
  try {
    return res.json(await service.getPets("",targetUser,0,0,0));

  } catch (error) {
    next(error);
  }
}

const getPetsByTypeBreed = async (req: Request, res: Response, next: NextFunction) => {
  const targetType = parseInt(req.params.type)
  const targetBreed = parseInt(req.params.breed)
  
  try {
    return res.json(await service.getPets("","",targetType,targetBreed,0))

  } catch (error) {
    next(error);
  }
}

// Esta version no incluye fotos, fue la original
const createPetOld = async (req: Request, res: Response, next: NextFunction) => { 

  const petData: InsertPetDto = req.body;

  try {
    
    // Create a new instance of InsertPetDto para validar
    let petInsert = new InsertPetDto();
    petInsert.name = petData.name;
    petInsert.owner_user = petData.owner_user;
    petInsert.pet_type = petData.pet_type;
    petInsert.breed_id = petData.breed_id;
    petInsert.pet_status = petData.pet_status;
    petInsert.age = petData.age

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

// Nueva version, da de alta los datos con req.body.json y las fotos desde req.files
const createPet = async (req: Request, res: Response, next: NextFunction) => { 

  const petData: InsertPetDto = JSON.parse(req.body.json);

  try {
    
    // Create a new instance of InsertPetDto para validar
    let petInsert = new InsertPetDto();
    petInsert.name = petData.name;
    petInsert.owner_user = petData.owner_user;
    petInsert.pet_type = petData.pet_type;
    petInsert.breed_id = petData.breed_id;
    petInsert.pet_status = petData.pet_status;
    petInsert.age = petData.age

    // Validar datos de entrada
    const errors = await validate(petInsert);
    if (errors.length > 0) {
      // Errores de validacion
      return res.status(400).json({ errors: errors.map((error) => error.toString()) });
    }  else {
      // si paso validaciones de input, voy a crearlo en bd
      const pet = await service.createPet(petInsert)

      // Si dio de alta la mascota, voy a ingresar sus photos

      if (!(!req.files || !Array.isArray(req.files))) {
        
        const files: Express.Multer.File[] = req.files;
  
        const petPhotos = await photoService.createPetPhoto(pet.pet_id, files);

      }
  
      return res.status(200).send(pet)
    }
  } catch(error) {
    next(error)
  }

}


const updatePet = async (req: Request, res: Response, next: NextFunction) => {

  const petId = req.params.id;
  const petData: UpdatePetDto = req.body;

  try {
    

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

const deletePet = async (req: Request, res: Response, next: NextFunction) => {
    const targetId = req.params.id;
    try {
      return res.json(await service.deletePet(targetId));
  
    } catch (error) {
      next(error);
    }
}

export default {getAllPets, getPetById, getPetsByUser, createPet, updatePet, deletePet, getPetsByTypeBreed, getPetsByStatus}

