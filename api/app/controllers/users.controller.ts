import { NextFunction, Request, Response } from 'express';
import { generateToken } from "../middleware/utils";
import services from '../services/users.services'


// Get a JWT token with 1-hour expiration
// para consumirlo armar request.body con { "username":"admin", "password":"password"} y application/json
const createToken = async (req: Request, res: Response, next: NextFunction) => {

  const { username, password } = req.body;

  // validar username y password 
  if (await services.verifyUser(username, password)) {
    const token = generateToken(username, 1000 * 60 * 60); // 1 hora en miliseconds
    res.json({ token });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
}

export default { createToken };