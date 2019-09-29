import { Container } from 'inversify';

import { TYPES } from '@src/constant/types';
import { HelloService, HelloServiceImpl } from '@src/service';

const container = new Container();
container.bind<HelloService>(TYPES.HelloService).to(HelloServiceImpl);

export { container };
