import pool from './db';

interface Pet {
  pet_id?: number;
  pet_name: string;
  pet_photo: string;
  pet_owner: string;
  walks: string[];
}

async function getAllPets() {
  const [rows] = await pool.query('SELECT * FROM pets');
  return rows;
}

async function getPetById(id: number) {
  const [rows] = await pool.query('SELECT * FROM pets WHERE id = ?', [id]);
  return rows[0];
}

async function createPet(pet: Pet) {
  const { name, photo, owner, walks } = pet;
  const [result] = await pool.query(
    'INSERT INTO pets (name, photo, owner, walks) VALUES (?, ?, ?, ?)',
    [name, photo, owner, JSON.stringify(walks)],
  );
  return { id: result.insertId, name, photo, owner, walks };
}

async function updatePet(id: number, pet: Pet) {
  const { name, photo, owner, walks } = pet;
  await pool.query(
    'UPDATE pets SET name = ?, photo = ?, owner = ?, walks = ? WHERE id = ?',
    [name, photo, owner, JSON.stringify(walks), id],
  );
  return { id, name, photo, owner, walks };
}

async function deletePet(id: number) {
  await pool.query('DELETE FROM pets WHERE id = ?', [id]);
}

export { getAllPets, getPetById, createPet, updatePet, deletePet };
