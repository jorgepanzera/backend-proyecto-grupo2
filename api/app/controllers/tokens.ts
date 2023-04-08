import { NextFunction, Request, Response } from 'express';
import { generateToken } from "../middleware/utils";


// Get a JWT token with 1-hour expiration
// para consumirlo armar request.body con { "username":"admin", "password":"password"} y application/json
const createToken = (req: Request, res: Response, next: NextFunction) => {
    
  const { username, password } = req.body;

    // validar username y password desde una bd
    if (username === "admin" && password === "password") {
        const token = generateToken(username, 1000*60*60 ); // 1 hora en miliseconds
        res.json({ token });
    } else {
      res.status(401).send({ message: "Invalid credentials" });
  }
}

export default { createToken };