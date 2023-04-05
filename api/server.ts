import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { connection } from "./db";
import { getAllPets, getPetById, createPet, updatePet, deletePet } from "./pets";

function logActivity(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} request received for ${req.url}`);
  res.on('finish', () => {
    console.log(`${req.method} request for ${req.url} responded with status ${res.statusCode}`);
  });
  next();
}

app.use(express.json());
const port = 3000;

// loguear todos los request and response
app.use(logActivity);


// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Utility function to generate a JWT token
function generateToken(payload: any, expiresIn: string) {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn });
}

// Middleware to authenticate requests with JWT
const authenticateJWT = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Get a JWT token with 1-hour expiration time
app.post("/token", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "password") {
    const token = generateToken({ username: "admin" }, "1h");
    res.json({ token });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

// Ping route to test API availability
app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong");
});

// Get all pets
app.get("/pets", authenticateJWT, getAllPets);

// Get a pet by id
app.get("/pets/:id", authenticateJWT, getPetById);

// Create a new pet
app.post("/pets", authenticateJWT, createPet);

// Update a pet by id
app.put("/pets/:id", authenticateJWT, updatePet);

// Delete a pet by id
app.delete("/pets/:id", authenticateJWT, deletePet);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


