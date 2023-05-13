import express, { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

// JWT secret key
//const secretKey = process.env.JWT_SECRET as string;
const secretKey = process.env.JWT_SECRET as string


// Generate a new JWT token with a one hour expiration time
// Utility function to generate a JWT token
export function generateToken(username: string, expiresIn: number) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiration = Math.floor(Date.now() / 1000) + expiresIn;
  //console.log(`secretKey: ${secretKey} issuedAt: ${issuedAt} expiration: ${expiration}`)
  return jwt.sign({ name:username, iat: issuedAt, exp: expiration }, secretKey);
}

// JWT secret token authentication middleware
// Para consumirlo 1) obtener JWT token con el post /token (usuario y password)
// armar header.authorization "Bearer tokenObtenido" 
// ejemplo "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODA5MDA4MzcsImV4cCI6MTY4NDUwMDgzN30.UTsEEX2BgrrYiQ2cp1quTUZUMnj3L5FIT5ZecNQ4Btc"
export const authenticateJWT = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers.authorization;
  let authenticationDefault = false

  console.log(authHeader)
  // Autenticacion explicita para la aplicacion web, clave predefinida
  if (authHeader === (process.env.DEFAULT_AUTHENTICATION_TOKEN) as string) {
    authenticationDefault = true
    next()
  }

  if (!authenticationDefault) {
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
          }          
          return res.sendStatus(403);
        }

        //req.user = user; Si lo necesito luego al dato user, hay que hacer una interfaz AuthenticatedRequest extends Request y agregar el dato user
        next();
      });
    } else {
      res.sendStatus(401);
      }
  }
};
