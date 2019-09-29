import 'reflect-metadata';
import * as supertest from 'supertest';

import server from '@src/server';

describe('Server Integration Test', () => {
  afterAll(done => server.close(done));

  test('should perform GET request to /v1/ endpoint', async done => {
    // Given

    // When
    const response: supertest.Response = await supertest(server).get('/v1/');

    // Then
    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    done();
  });

  test('should perform GET request to /v2/ endpoint', async done => {
    // Given

    // When
    const response: supertest.Response = await supertest(server).get('/v2/');

    // Then
    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    done();
  });
});
