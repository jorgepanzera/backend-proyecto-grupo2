import { IsNotEmpty, IsIn, IsInt } from 'class-validator';

export interface Pet {
  pet_id: number;
  owner: string;
  name: string;
  pet_type: number;
  type: string;
  breed_id: number;
  breed: string;
  qr_code: string;
  status_id: number;
  status: string;
  events: Event[];
  photos: PetPhoto[]
}

export interface Event {
  event_id: number;
  event_type: number;
  event_name: string;
  created_by: string;
  created_date: Date
  latitude: number;
  longitud: number;
  photos: EventPhoto[]
}

export interface PetPhoto {
  photo_id: number;
  url: string;
  main_photo: number,
  created_date: Date;
}

export interface EventPhoto {
  photo_id: number;
  url: string;
  created_date: Date;
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
}
