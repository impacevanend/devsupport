import request from 'supertest';
import app from '../src/app.js';
import { resetDb, disconnectDb } from './utils/db.js';

describe('Tickets module', () => {
  beforeAll(async () => {
    await resetDb();
  });

  afterAll(async () => {
    await disconnectDb();
  });

  it('rechaza payload inválido con 400 (Zod)', async () => {
    const res = await request(app).post('/tickets').send({
      title: '',                       
      description: 'abc',              
      priority: 'HIGH',
      authorEmail: 'no-es-email'       
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Validación fallida');
    expect(Array.isArray(res.body.errors)).toBe(true);
  });

  it('crea y devuelve un ticket con 201', async () => {
    const payload = {
      title: 'Error al iniciar sesión',
      description: 'El login falla con 500 al usar correo corporativo',
      priority: 'HIGH',
      authorEmail: 'jbravo@poli.com',
      authorName: 'Jose Bravo'
    };

    const res = await request(app).post('/tickets').send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      title: payload.title,
      description: payload.description,
      status: 'OPEN',
      priority: 'HIGH',
      author: {
        email: payload.authorEmail
      }
    });
  });

  it('lista tickets con 200 (incluye el recién creado)', async () => {
    const res = await request(app).get('/tickets');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
