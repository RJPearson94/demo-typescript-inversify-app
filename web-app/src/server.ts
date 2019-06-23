import 'reflect-metadata';
import { config } from 'dotenv';
import { urlencoded, json } from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import '@src/controller';
import container from '@shared/inversify.config';

config();
const serverPort: string = process.env.PORT || '3000';

// start the server
const server = new InversifyExpressServer(container);

server.setConfig(app => {
  app.use(
    urlencoded({
      extended: true
    })
  );
  app.use(json());
});

server.build().listen(serverPort, () => console.info(`Server running at http://localhost:${serverPort}/`));
