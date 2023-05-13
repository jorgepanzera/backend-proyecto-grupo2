import { NextFunction, Request, Response } from 'express';
import service from '../services/util.services'

const getPetTypes = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
      return res.json(await service.getPetTypes())
  
    } catch (error) {
      next(error);
    }
}
  
const getPetBreeds = async (req: Request, res: Response, next: NextFunction) => {
    const targetPetType = parseInt(req.params.pet_type)
        
    try {
      return res.json(await service.getPetBreeds(targetPetType))
  
    } catch (error) {
      next(error);
    }
}
  
export default {getPetBreeds, getPetTypes}