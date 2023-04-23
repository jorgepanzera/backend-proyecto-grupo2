
// Posible implementacion para getAllPets, con los eventos adentro como array (aca se llaman walks)
/*
export async function getPetsWithWalks(): Promise<Pet[]> {
    const query = `SELECT *, (SELECT COUNT(*) FROM walk WHERE pet_id = pets.id) AS countWalks FROM pets`;
    const queryResult = await queryDatabase<Pet>(query); // Quizas haya que hacer una interface Pets + countWalks para que esto funcione, y queryDatabase<PetExtended>

    select a.pet_id, a.name, a.owner_user, a.pet_type, b.type_name as pet_type, a.breed_id, c.breed_name,
	(select count(*) from event where event.pet_id = a.pet_id) as cant_events
from pet a
LEFT JOIN pet_type b on b.id = a.pet_type
LEFT JOIN pet_breed c on c.pet_breed = a.breed_id and c.pet_type = a.pet_type
  
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