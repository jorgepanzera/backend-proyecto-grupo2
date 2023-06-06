
import controller from '../controllers/user.controller';
import express from 'express';
import { authenticateJWT } from '../middleware/jwt.middle';
import imageController from '../controllers/photo.controller'
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });


// no lleva authenticateJWT, es para obtener el token
router.post('/login', controller.createToken)
router.post("/", controller.createUser)
router.post('/photo/:id', authenticateJWT, upload.array('photos'), imageController.uploadUserImage)

export = router;