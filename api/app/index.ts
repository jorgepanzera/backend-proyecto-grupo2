// App principal de la API, es consumida por el server.ts
// Separation of concerns
// server <= app
//      app <= routes <= controllers & middleware <= services

import express, { Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import { logActivity } from "./middleware/utils"
import petRoutes from './routes/pet.routes.'
import userRoutes from './routes/user.routes'


const app = express()

// ** Middleware ** //

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para loguear actividad
app.use(logActivity)

// ** Routes ** //

// Ping route to test API availability
app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong");
});

// "Business" Routes
app.use('/users', userRoutes)
app.use('/pets', petRoutes)



export default app
