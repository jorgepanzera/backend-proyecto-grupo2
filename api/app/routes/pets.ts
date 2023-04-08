import controller from '../controllers/pets';
import express from 'express';
import { authenticateJWT } from '../middleware/utils';

const router = express.Router();

router.post('/', controller.createPet)
router.get('/:id', controller.getPetById)
router.get('/', authenticateJWT, controller.getAllPets)
// router.get('/', authenticateJWT, controller.getAllPets) PROBAR LUEGO CON JWT


router.delete('/:id', controller.deletePet)
router.put('/:id', controller.deletePet)
//router.put('/:id', controller.updatePet)
//router.delete('/:id', controller.deletePete)

export = router;