import request from "supertest";
import app from "../app";
import { describe, it, expect } from '@jest/globals';

describe('Ping Endpoint', () => {
  it('should return status 200 OK', async () => {
    const response = await request(app).get('/ping');

    expect(response.status).toBe(200);
  });

  it('should return the expected response message', async () => {
    const response = await request(app).get('/ping');

    expect(response.text).toBe('Pong');
  });
});




describe('User Endpoints', () => {

  let authToken = ""

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
      username: 'TestUserFromJest',
      password: '12345678',
      email: 'kajdfpe@pepe.com',
      user_type: 2,
    };

    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${authToken}`)
      .send(userData);

    
    expect(response.status).toBe(200);
    // Add more assertions based on your API's response
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
      .get('/users/TestUserFromJest')
      .set('Authorization', `Bearer ${authToken}`)
    
    expect(response.status).toBe(200);
    expect(response.body.username).toBe('TestUserFromJest');

  });

  // Add more test cases for other user endpoints similarly
});

/*
describe('Pet Endpoints', () => {
  it('should get all pets', async () => {
    const response = await request(app)
      .get('/pets')
      .set('Authorization', 'Bearer yourAccessToken');

    expect(response.status).toBe(200);
    // Add more assertions based on your API's response
  });

  it('should create a new pet', async () => {
    const petData = {
      name: 'Wifi',
      owner_user: 'testfreeuser',
      pet_type: 1,
      breed_id: 22,
    };

    const response = await request(app)
      .post('/pets')
      .set('Authorization', 'Bearer yourAccessToken')
      .send(petData);

    expect(response.status).toBe(200);
    // Add more assertions based on your API's response
  });

  // Add more test cases for other pet endpoints similarly
});
*/
