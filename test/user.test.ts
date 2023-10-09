import request from "supertest";
import app from "../app";
import { describe, it, expect } from '@jest/globals';
import { UpdateUserDto } from "../models/user.model";
import { v4 as uuid } from 'uuid';

describe('User Endpoints', () => {

  let authToken = ""

  // generate unique username
  const unique_username = uuid()

  it('Login a valid user', async () => {
    const loginData = {
      "email": 'panzera.jorge@gmail.com',
      "password": 'FreeTestUser2023'
    };

    const response = await request(app)
      .post('/users/login')
      .send(loginData);

    expect(response.status).toBe(200);

    // Guardar el token para los siguientes test cases
    authToken = response.body.token; 

  });

  it('Create a new user', async () => {
    const userData = {
      username: unique_username,
      password: '12345678',
      email: 'kajdfpe@pepe.com',
      user_type: 2,
    };

    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .send(userData);

    
    expect(response.status).toBe(200);

  });

  it('Fails - Create a new user with no valid email property', async () => {
    const userData = {
      username: 'TestUser',
      password: '12345678',
      email: 'kajdfpe.com',
      user_type: 2,
    };

    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.text).toContain('property email has failed the following constraints: isEmail')
    // Add more assertions based on your API's response
  });

  it('Get user data', async () => {

    console.log(`token ${authToken}`)

    const response = await request(app)
      .get(`/users/${unique_username}`)
      .set('Authorization', `Bearer ${authToken}`)
    
    expect(response.status).toBe(200);
    expect(response.body.username).toBe(unique_username);

  });

  it('Update a user', async () => {
    const updateUserDto: UpdateUserDto = {
      username: unique_username,
      password: 'newPassword',
      mobile_number: '1234567890',
      email: 'newemail@example.com',
      user_type: 2,
    };

    const response = await request(app)
      .patch('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateUserDto);

    expect(response.status).toBe(200);

  });

  it('Fails - update a user with invalid email', async () => {
    const updateUserDto: UpdateUserDto = {
      username: 'TestUserFromJest',
      password: 'newPassword',
      mobile_number: '1234567890',
      email: 'invalidemail', // Invalid email format
      user_type: 2,
    };

    const response = await request(app)
      .patch('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateUserDto);

    expect(response.status).toBe(400);

  });

  /*
  it('Fails - update a user with invalid user type', async () => {
    const updateUserDto: UpdateUserDto = {
      username: 'TestUserFromJest',
      password: 'newPassword',
      mobile_number: '1234567890',
      email: 'newemail@example.com',
      user_type: 8, // Invalid user type
    };

    const response = await request(app)
      .patch('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateUserDto);

    expect(response.status).toBe(400);

  });
  */

});

describe('Pet Endpoints', () => {

  let authToken = ""
  let pet_id = 0

  it('Login a valid user', async () => {
    const loginData = {
      "email": 'panzera.jorge@gmail.com',
      "password": 'FreeTestUser2023'
    };

    const response = await request(app)
      .post('/users/login')
      .send(loginData);

    expect(response.status).toBe(200);

    // Guardar el token para los siguientes test cases
    authToken = response.body.token; 

  });

  it('Create a new pet', async () => {
    const petData = {
    name: "MyTestPet",
    owner_user:"testFreeUser",
    pet_type:1,
    breed_id: 15,
    pet_status: 1,
    age: 3
    };

    const response = await request(app)
      .post('/pets')
      .set('Authorization', `Bearer ${authToken}`)
      .send(petData);

    
    expect(response.status).toBe(200);

    // me quedo con el pet_id para usarlo en update y delete
    pet_id = response.body.pet_id
    
  });

  it('Fails - Create a pet with invalid breed or type', async () => {
    const petData = {
    name: "MyTestPet2",
    owner_user:"testFreeUser",
    pet_type:2,
    breed_id: 15,
    pet_status: 1,
    age: 3
    };

    const response = await request(app)
      .post('/pets')
      .set('Authorization', `Bearer ${authToken}`)
      .send(petData);
    
    expect(response.status).toBe(500);
    
  });  

  it('Get Lost Pets', async () => {

    const response = await request(app)
      .get('/pets/status/2')
      .set('Authorization', `Bearer ${authToken}`)
    
    expect(response.status).toBe(200);

  });  

  it('Get Pet By Id', async () => {

    const response = await request(app)
      .get(`/pets/${pet_id}`)
      .set('Authorization', `Bearer ${authToken}`)
    
    expect(response.status).toBe(200); // estoy consultando la pet creada en la prueba anterior

  });    

  it('Update an existing pet', async () => {
    const petData = {
    name: "MyUpdatedet",
    pet_status: 2,
    age: 7
    };

    const response = await request(app)
      .patch(`/pets/${pet_id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(petData);

    expect(response.status).toBe(200);
   
  });

  it('Delete an existing pet', async () => {

    const response = await request(app)
      .delete(`/pets/${pet_id}`)
      .set('Authorization', `Bearer ${authToken}`)

    expect(response.status).toBe(200);
   
  });  


});

