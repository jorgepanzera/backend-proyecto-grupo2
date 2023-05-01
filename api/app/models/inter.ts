export interface Pet {
  pet_id: number;
  owner: string;
  name: string;
  pet_type: number;
  type: string;
  breed_id: number;
  breed: string;
  status_id: number;
  status: string;
  cant_events: number;
  events: Event[];
}

export interface Event {
  event_id: number;
  event_type: number;
  event_name: string;
  created_by: string;
  created_date: Date
  duration: number;
  distance: number;
}


export interface User {
  username: string;
  password: string
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
