import { NextFunction, Request, Response } from 'express';
import { Pet } from '../models/pet.model'
import service from '../services/pet.services'


const getAllPets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json(await service.getPets(0,""))

  } catch (error) {
    next(error);
  }
}


const getPetById = async (req: Request, res: Response, next: NextFunction) => {
  const targetId = parseInt(req.params.id)
  
  try {
    return res.json(await service.getPets(targetId,""))

  } catch (error) {
    next(error);
  }
}

const getPetsByUser = async (req: Request, res: Response, next: NextFunction) => {
  const targetUser = req.params.user
  
  try {
    return res.json(await service.getPets(0,targetUser))

  } catch (error) {
    next(error);
  }
}


const createPet = (req: Request, res: Response, next: NextFunction) => {
    res.json(req.body)
}

const updatePet = (req: Request, res: Response, next: NextFunction) => {
    const targetId = parseInt(req.params.id)
  res.json({ targetId })
}

const deletePet = (req: Request, res: Response, next: NextFunction) => {
    const targetId = parseInt(req.params.id)
  res.json({ targetId })
}

export default {getAllPets, getPetById, getPetsByUser, createPet, updatePet, deletePet}

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