import express, { Request, Response, NextFunction } from "express"

// Loguear a consola todo los request y response de la API
// Posible mejora usando log a archivo con morgan o similar
export function logActivity(req: Request, res: Response, next: NextFunction) {
    console.log(`[${new Date().toISOString()}] Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)
    // console.log(`[${new Date().toISOString()}] ${req.method} request received for ${req.url}`);
      res.on('finish', () => {
        console.log(`[${new Date().toISOString()}] Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
      });
      next();
  }