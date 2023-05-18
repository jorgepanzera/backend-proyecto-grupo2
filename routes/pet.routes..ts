import controller from '../controllers/pet.controller.';
import imageController from '../controllers/image.controller'
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

router.post('/photo/:id', authenticateJWT, upload.array('photos'), imageController.uploadPetImage)

export = router;