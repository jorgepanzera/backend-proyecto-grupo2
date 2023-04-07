// App principal de la API, es consumida por el server.ts
// Separation of concerns
// server <= app
//      app <= routes <= controllers & middleware <= services

import express, { Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import { logActivity } from "./middleware/utils"
import tokenRoutes from './routes/tokens';


const app = express()

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para loguear actividad
app.use(logActivity)

// Ping route to test API availability
app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong");
});
  
// Routes
app.use('/token', tokenRoutes)

export default app
