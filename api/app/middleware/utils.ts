import express, { Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import jwt from "jsonwebtoken"
import process from "process"

// Loguear a consola todo los request y response de la API
// Posible mejora usando log a archivo con morgan o similar
export function logActivity(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} request received for ${req.url}`);
    res.on('finish', () => {
      console.log(`${req.method} request for ${req.url} responded with status ${res.statusCode}`);
    });
    next();
}

// ****************
// JWT section
// ****************

// JWT secret key
const secretKey = process.env.JWT_SECRET as string;

// Generate a new JWT token with a one hour expiration time
export const generateToken = (payload: any) => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

// JWT secret token authentication middleware
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err:any, user:any) => {
    if (err) return res.sendStatus(403);
    //req.user = user;
    next();
  });
};
