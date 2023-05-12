
import controller from '../controllers/user.controller';
import express from 'express';
import { authenticateJWT } from '../middleware/utils';

const router = express.Router();

// no lleva authenticateJWT, es para obtener el token
router.post('/token', controller.createToken)
router.post("/", authenticateJWT, controller.createUser)

export = router;