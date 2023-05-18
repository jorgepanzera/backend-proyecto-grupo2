import controller from '../controllers/pet.controller.';
import express from 'express';
import { authenticateJWT } from '../middleware/jwt.middle';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', authenticateJWT, upload.array('photos'), controller.createPet)
router.get('/:id', authenticateJWT, controller.getPetById)
router.get('/user/:user', authenticateJWT, controller.getPetsByUser)
router.get('/', authenticateJWT, controller.getAllPets)
router.delete('/:id', authenticateJWT, controller.deletePet)
router.patch('/:id', authenticateJWT, controller.updatePet)

export = router;