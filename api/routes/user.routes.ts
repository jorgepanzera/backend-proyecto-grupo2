
import controller from '../controllers/user.controller';
import express from 'express';

const router = express.Router();

// no lleva authenticateJWT, es para obtener el token
router.post('/token', controller.createToken)

export = router;