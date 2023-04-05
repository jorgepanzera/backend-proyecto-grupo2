import express, { Request, Response, NextFunction } from "express";
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

  // obtener username y password desde una bd
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
app.get("/pets/:id", authenticateJWT, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await getPetById(id)
    }
);


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


// MEZCLAR ESTAS FUNCIONES Con las de cada metodo rest 
/*
// Gets a pet by id
app.get("/pets/:id", logActivity, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const [rows] = await connection.query<Pet[]>("SELECT * FROM pets WHERE pet_id = ?", [id]);
    if (rows.length === 1) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ message: "Pet not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Adds a new pet
app.post("/pets", logActivity, async (req: Request, res: Response) => {
  const pet: Pet = req.body;
  try {
    const [result] = await connection.query("INSERT INTO pets SET ?", [pet]);
    const petId = result.insertId;
    pet.pet_id = petId;
    res.send({ message: "Pet added successfully", pet });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Updates a pet by id
app.put("/pets/:id", logActivity, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updatedPet: Pet = req.body;
  try {
  const [result] = await connection.query("UPDATE pets SET ? WHERE pet_id = ?", [
    updatedPet,
    id,
  ]);
  if (result.affectedRows === 1) {
    res.send({ message: "Pet updated successfully", pet: updatedPet });
  } else {
    res.status(404).send({ message: "Pet not found" });
  }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Deletes a pet by id
app.delete("/pets/:id", logActivity, async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const [result] = await connection.query("DELETE FROM pets WHERE pet_id = ?", [id]);
    if (result.affectedRows === 1) {
      res.send({ message: "Pet deleted successfully" });
    } else {
      res.status(404).send({ message: "Pet not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});
*/

