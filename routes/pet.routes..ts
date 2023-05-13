import controller from '../controllers/pet.controller.';
import express from 'express';
import { authenticateJWT } from '../middleware/jwt.middle';

const router = express.Router();

router.post('/', authenticateJWT, controller.createPet)
router.get('/:id', authenticateJWT, controller.getPetById)
router.get('/user/:user', authenticateJWT, controller.getPetsByUser)
router.get('/', authenticateJWT, controller.getAllPets)
router.delete('/:id', authenticateJWT, controller.deletePet)
router.put('/:id', authenticateJWT, controller.deletePet)

export = router;