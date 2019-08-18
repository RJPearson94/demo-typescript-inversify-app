import { Container } from 'inversify';

import TYPES from '@src/constant/types';
import HelloService from '@src/service/hello/hello';
import HelloServiceImpl from '@src/service/hello/impl/hello-impl';

const container = new Container();
container.bind<HelloService>(TYPES.HelloService).to(HelloServiceImpl);

export default container;
