import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as supertest from 'supertest';
import { Response } from 'supertest';

import { container } from '@rjpearson94/core';

import '@src/controller/v1';

describe('V1GreetingController Integration Test', () => {
  test('should GET Hello when the /v1/ endpoint is called', async () => {
    // Given

    // When
    const server = new InversifyExpressServer(container);
    const response: Response = await supertest(server.build()).get('/v1/');

    // Then
    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.get('content-type')).toEqual('text/html; charset=utf-8');
    expect(response.text).toEqual('Hello');
  });
});
