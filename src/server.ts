import 'reflect-metadata';
import { urlencoded, json } from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';

import '@initial-service/controller';
import container from '@initial-service/inversify.config';

// start the server
const server = new InversifyExpressServer(container);

server.setConfig(app => {
  app.use(urlencoded({
    extended: true
  }));
  app.use(json());
});

server.build().listen(3000);