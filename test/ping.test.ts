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