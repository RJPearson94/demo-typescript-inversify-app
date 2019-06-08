import 'reflect-metadata';
import { urlencoded, json } from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import '@src/controller';
import container from '@shared/inversify.config';

// start the server
const server = new InversifyExpressServer(container);

server.setConfig(app => {
  app.use(urlencoded({
    extended: true
  }));
  app.use(json());
});

server.build().listen(3000);