import { NextFunction, Request, Response } from 'express';
import { Pet } from '../models/inter'
import service from '../services/pet.services'


/*
const pets: Pet[] = [
    {
      id: 1,
      name: 'Buddy',
      state: 'active',
      owner: 'Alice',
      walks: [
        { date: new Date('2022-01-01'), duration: 30, distance: 2.5 },
        { date: new Date('2022-01-02'), duration: 45, distance: 3.5 },
      ],
    },
    {
      id: 2,
      name: 'Charlie',
      state: 'inactive',
      owner: 'Bob',
      walks: [
        { date: new Date('2022-02-01'), duration: 20, distance: 1.5 },
        { date: new Date('2022-02-02'), duration: 25, distance: 2.0 },
      ],
    },
    {
      id: 3,
      name: 'Daisy',
      state: 'active',
      owner: 'Carol',
      walks: [
        { date: new Date('2022-03-01'), duration: 40, distance: 3.0 },
        { date: new Date('2022-03-02'), duration: 35, distance: 2.5 },
      ],
    },
];
*/
  

const getAllPets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json(await service.getPets(0))

  } catch (err) {
    console.error(err);
    next(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}


const getPetById = async (req: Request, res: Response, next: NextFunction) => {
  const targetId = parseInt(req.params.id)
  
  try {
    return res.json(await service.getPets(targetId))

  } catch (err) {
    console.error(err);
    next(err);
    return res.status(500).json({ error: "Internal server error" });
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

export default {getAllPets, getPetById, createPet, updatePet, deletePet}

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