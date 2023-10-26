import { IsNotEmpty, IsIn, IsInt,IsDefined, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer'
import { generateUUID } from '../utils/generate_uuid';

export interface Pet {

  pet_id: number;
  owner: PetOwner;
  name: string;
  pet_type: number;
  type: string;
  breed_id: number;
  breed: string;
  qr_code: string; 
  status_id: number;
  status: string;
  age: number;
  events: Event[];
  photos: PetPhoto[];
}

export interface Event {
  event_id: number;
  event_type: number;
  event_name: string;
  created_by: string;
  created_date: Date;
  latitude: number;
  longitud: number;
  photos: EventPhoto[];
}

export interface PetPhoto {
  photo_id: number;
  url: string;
  main_photo: number;
  created_date: Date;
}

export interface EventPhoto {
  photo_id: number;
  url: string;
  created_date: Date;
}

export interface PetOwner {
  username: string;
  email: string;
  mobile_number: string;
}

export interface Message {
  message_id: number;
  from: string;
  to: string;
  type: string;
  created: Date;
  message: string
}

export class InsertPetDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  owner_user!: string;

  @IsNotEmpty()
  @IsIn([1, 2])
  pet_type!: number;

  @IsNotEmpty()
  @IsInt()
  breed_id!: number;

  @IsNotEmpty()
  @IsInt()
  pet_status!: number;

  @IsNotEmpty()
  @IsInt()
  age!: number;

  // @Transform(({ value }) => value || generateUUID())
  // id!: string;
}

export class UpdatePetDto {
  @ValidateIf((obj) => !obj.name && !obj.breed_id && !obj.pet_status && !obj.age)
  @IsDefined({ message: 'Al menos uno de los datos (pet_status, breed_id, name, age) son requeridos para updatePet' })
  @Transform(({ value }) => value || undefined)
  name?: string;

  @ValidateIf((obj) => !obj.name && !obj.breed_id && !obj.pet_status && !obj.age)
  @IsDefined({ message: 'Al menos uno de los datos (pet_status, breed_id, name, age) son requeridos para updatePet' })
  @Transform(({ value }) => value || undefined)
  breed_id?: number;

  @ValidateIf((obj) => !obj.name && !obj.breed_id && !obj.pet_status && !obj.age)
  @IsDefined({ message: 'Al menos uno de los datos (pet_status, breed_id, name, age) son requeridos para updatePet' })
  @Transform(({ value }) => value || undefined)
  pet_status?: number;

  @ValidateIf((obj) => !obj.name && !obj.breed_id && !obj.pet_status && !obj.age)
  @IsDefined({ message: 'Al menos uno de los datos (pet_status, breed_id, name, age) son requeridos para updatePet' })
  @Transform(({ value }) => value || undefined)
  age?: number;
}
