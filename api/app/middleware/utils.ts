import express, { Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import jwt from "jsonwebtoken"
import process from "process"

// Loguear a consola todo los request y response de la API
// Posible mejora usando log a archivo con morgan o similar
export function logActivity(req: Request, res: Response, next: NextFunction) {
    console.log(`[${new Date().toISOString()}] ${req.method} request received for ${req.url}`);
    res.on('finish', () => {
      console.log(`[${new Date().toISOString()}] ${req.method} request for ${req.url} responded with status ${res.statusCode}`);
    });
    next();
}


// ****************
// JWT section
// ****************

// JWT secret key
//const secretKey = process.env.JWT_SECRET as string;
const secretKey = "MySecretKeyForTheProject5456454"


// Generate a new JWT token with a one hour expiration time
// Utility function to generate a JWT token
export function generateToken(username: string, expiresIn: number) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiration = Math.floor(Date.now() / 1000) + expiresIn;
  console.log(`secretKey: ${secretKey} issuedAt: ${issuedAt} expiration: ${expiration}`)
  return jwt.sign({ name:username, iat: issuedAt, exp: expiration }, secretKey);
}

// JWT secret token authentication middleware
export const authenticateJWT = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }

      //req.user = user; Si lo necesito luego al dato user, hay que hacer una interfaz AuthenticatedRequest extends Request y agregar el dato user
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
