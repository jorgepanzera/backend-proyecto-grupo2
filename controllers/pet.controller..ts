import { NextFunction, Request, Response } from 'express';
import { Pet } from '../models/pet.model'
import service from '../services/pet.services'
import handleFileUpload from '../middleware/storage.middle'


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

const createPet = async () => { }

/*
****** Obtener aqui el req.body en petData y el req.files en una variable Express.Multer.File[]
****** pasar ambas al service.createPet y alli guardar en base el petData y en cloud storage usando handleFileUpload
const createPet = async (req: Request, res: Response) => {
  try {
    // Extract basic pet data from the JSON payload
    const { name, age, breed } = req.body;

    // Create a new instance of the Pet model with basic pet data
    const newPet = new Pet({ name, age, breed });

    // Iterate over the array of photos
    for (const file of req.files as Express.Multer.File[]) {
      // Handle each file individually (e.g., store it in a file system, upload to a cloud storage service, etc.)
      const fileUrl = await handleFileUpload(file);

      // Create a new instance of the Photo model with the file URL
      const newPhoto = new Photo({ url: fileUrl });

      // Add the new photo to the pet's photo collection
      newPet.photos.push(newPhoto);
    }

    // Save the new pet instance to the database
    await newPet.save();

    // Return the created pet object in the response
    return res.status(201).json(newPet);
  } catch (error) {
    // Handle any errors and return an appropriate response
    return res.status(500).json({ message: 'Failed to create pet', error: error.message });
  }
};

*/


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