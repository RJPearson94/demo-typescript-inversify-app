import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as supertest from 'supertest';
import '@src/controller/v1/greeting';
import container from '@shared/inversify.config';

describe('V1GreetingController Integration Test', () => {
  test('should GET Hello when the /v1/ endpoint is called', async done => {
    // Given

    // When
    const server = new InversifyExpressServer(container);
    const response: supertest.Response = await supertest(server.build()).get('/v1/');

    // Then
    expect(response).toBeDefined();
    expect(response.status).toEqual(200);
    expect(response.get('content-type')).toEqual('text/html; charset=utf-8');
    expect(response.text).toEqual('Hello');
    done();
  });
});
