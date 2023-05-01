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
