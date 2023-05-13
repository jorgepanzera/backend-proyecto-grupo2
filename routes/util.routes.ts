
import controller from '../controllers/util.controller';
import express from 'express';
import { authenticateJWT } from '../middleware/jwt.middle';

const router = express.Router();

router.get('/pettype', authenticateJWT,controller.getPetTypes)
router.get('/petbreed/:pet_type', authenticateJWT, controller.getPetBreeds)


export = router;