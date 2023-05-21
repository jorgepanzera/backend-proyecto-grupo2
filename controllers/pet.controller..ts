import { NextFunction, Request, Response } from 'express';
import { Pet, InsertPetDto } from '../models/pet.model'
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


const updatePet = (req: Request, res: Response, next: NextFunction) => {
    const targetId = parseInt(req.params.id)
  res.json({ targetId })
}

const deletePet = (req: Request, res: Response, next: NextFunction) => {
    const targetId = parseInt(req.params.id)
  res.json({ targetId })
}

export default {getAllPets, getPetById, getPetsByUser, createPet, updatePet, deletePet, getPetsByTypeBreed}

/* CON BD
const getAllPets = (req: Request, res: Response, next: NextFunction) => {
    const pets = await getAllPets();
    res.json(pets);
  });
  
  app.get('/pets/:id', authenticateJWT, async (req, res) => {
    const id = parseInt(req.params.id);
    const pet = await getPetById(id);
    if (pet) {
      res.json(pet);
    } else {
      res.sendStatus(404);
    }
  });
  
  app.post('/pets', authenticateJWT, async (req, res) => {
    const pet = req.body;
    const createdPet = await createPet(pet);
    res.status(201).json(createdPet);
  });
  
  app.put('/pets/:id', authenticateJWT, async (req, res) => {
    const id = parseInt(req.params.id);
    const pet = req.body;
    const updatedPet = await updatePet(id, pet);
    res.json(updatedPet);
  });
  
  app.delete('/pets/:id', authenticateJWT, async (req, res) => {
    const id = parseInt(req.params.id);
    await deletePet(id);
    res.sendStatus(204);
  });
  */