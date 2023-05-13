import { NextFunction, Request, Response } from 'express';
import { generateToken } from "../middleware/jwt.middle";
import services from '../services/user.services'
import { validate } from 'class-validator';
import { User, InsertUserDto, UpdateUserDto } from "../models/user.model"


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

// Controller para crear usuario
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  
  const userData: User = req.body;

  try {
    // Create a new instance of User
    let user = new InsertUserDto();
    user.username = userData.username;
    user.password = userData.password;
    user.email = userData.email;
    user.mobile_number = userData.mobile_number;
    user.user_type = userData.user_type

    // Validar datos de entrada
    const errors = await validate(user);
    if (errors.length > 0) {
      // Errores de validacion
      return res.status(400).json({ errors: errors.map((error) => error.toString()) });
    }  else {
      // si paso validaciones de input, voy a crearlo en bd
      user = await services.createUser(user)
      return res.status(200).send(user)
    }
  } catch(error) {
    next(error)
  }
}

export default { createToken, createUser };