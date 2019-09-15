import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as supertest from 'supertest';

import { inversifyContainer } from '@rjpearson94/core';

import '@src/controller/v2/greeting';

describe('V2GreetingController Integration Test', () => {
  test('should GET JSON with SayHello message when the /v2/ endpoint is called', async done => {
    // Given

    // When
    const server = new InversifyExpressServer(inversifyContainer);
    const response: supertest.Response = await supertest(server.build()).get('/v2/');

    // Then
    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.get('content-type')).toEqual('application/json; charset=utf-8');
    expect(response.body).toEqual({
      message: 'SayHello'
    });
    done();
  });
});
