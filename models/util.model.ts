
export interface PetType {
    type_id: number;
    type_name: string;    
}

export interface PetBreed {
    breed_id: number,
    pet_type: number,
    breed_name: string
}