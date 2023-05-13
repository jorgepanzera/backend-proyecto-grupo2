
import controller from '../controllers/user.controller';
import express from 'express';
import { authenticateJWT } from '../middleware/jwt.middle';

const router = express.Router();

// no lleva authenticateJWT, es para obtener el token
router.post('/login', controller.createToken)
router.post("/", authenticateJWT, controller.createUser)

export = router;