
// Posible implementacion para getAllPets, con los eventos adentro como array (aca se llaman walks)
/*
export async function getPetsWithWalks(): Promise<Pet[]> {
    const query = `SELECT *, (SELECT COUNT(*) FROM walk WHERE pet_id = pets.id) AS countWalks FROM pets`;
    const queryResult = await queryDatabase<Pet>(query); // Quizas haya que hacer una interface Pets + countWalks para que esto funcione, y queryDatabase<PetExtended>
  
    const pets: Pet[] = [];
  
    for (const pet of queryResult.results) {
      if (pet.countWalks > 0) {
        const walksQuery = `SELECT * FROM walk WHERE pet_id = ${pet.id}`;
        const walksResult = await queryDatabase<Walk>(walksQuery);
        pet.walks = walksResult.results;
      }
  
      const newPet: Pet = {
        id: pet.id,
        name: pet.name,
        state: pet.state,
        owner: pet.owner,
        walks: pet.walks || []
      };
      delete pet.countWalks;
      pets.push(newPet);
    }
  
    return pets;
  }
  */   