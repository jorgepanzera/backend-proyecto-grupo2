
import controller from '../controllers/tokens';
import express from 'express';

const router = express.Router();

// no lleva authenticateJWT, es para obtener el token
router.post('/', controller.createToken)

export = router;