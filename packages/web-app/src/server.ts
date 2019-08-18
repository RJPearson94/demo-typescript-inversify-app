import 'reflect-metadata';

import { config } from 'dotenv';
import { urlencoded, json } from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';

import container from '@core/inversify.config';

import '@src/controller';

config();
const serverPort: string = process.env.PORT || '3000';

const server = new InversifyExpressServer(container);

server.setConfig((app): void => {
  app.use(
    urlencoded({
      extended: true
    })
  );
  app.use(json());
});

export default server.build().listen(serverPort, (): void => console.info(`Server running at http://localhost:${serverPort}/`));
