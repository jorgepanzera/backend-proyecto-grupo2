export interface User {
  username: string;
  password: string;
  user_type: number;
  type: string;
  email: string;
  mobile_number: string;
  created_time: Date
}

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
  cant_events: number;
  events: Event[];
  cant_photos: number;
  photos: Photo[]
}

export interface Event {
  event_id: number;
  event_type: number;
  event_name: string;
  created_by: string;
  created_date: Date
  latitude: number;
  longitud: number;
  photos: Photo[]
}

export interface Photo {
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

import { IsNotEmpty, IsEmail, IsOptional, IsInt, Min, IsDateString } from 'class-validator';

export class User {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  password!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsOptional()
  mobile_number!: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  user_type: number = 1;

   @IsOptional()
  created_time: Date = new Date();
}


/* class-validator para agregarle validaciones a las interfaces */
/*
import { IsString, IsEmail, MinLength } from 'class-validator';

class User {
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsEmail()
  email: string;

  // Other properties and methods
}

const createUser = async (req, res) => {
  try {
    const userData = req.body;

    const user = new User();
    Object.assign(user, userData); // Assign the user data to the user object

    // Validate the user object
    const errors = await validate(user);

    if (errors.length > 0) {
      // If there are validation errors, return the error response
      return res.status(400).json({ error: errors });
    }

    // Save the user to the database
    // ...

    // Return success response
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // Handle other errors
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

*/
/*
const pets: Pet[] = [
  {
    id: 1,
    name: 'Buddy',
    state: 'active',
    owner: 'Alice',
    walks: [
      { date: new Date('2022-01-01'), duration: 30, distance: 2.5 },
      { date: new Date('2022-01-02'), duration: 45, distance: 3.5 },
    ],
  },
  {
    id: 2,
    name: 'Charlie',
    state: 'inactive',
    owner: 'Bob',
    walks: [
      { date: new Date('2022-02-01'), duration: 20, distance: 1.5 },
      { date: new Date('2022-02-02'), duration: 25, distance: 2.0 },
    ],
  },
  {
    id: 3,
    name: 'Daisy',
    state: 'active',
    owner: 'Carol',
    walks: [
      { date: new Date('2022-03-01'), duration: 40, distance: 3.0 },
      { date: new Date('2022-03-02'), duration: 35, distance: 2.5 },
    ],
  },
];

export default { pets }
*/
