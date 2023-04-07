
import controller from '../controllers/tokens';
import express from 'express';

const router = express.Router();

router.post('/', controller.createToken)

export = router;