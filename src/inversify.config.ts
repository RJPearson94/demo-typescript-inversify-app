import { Container } from 'inversify';

import TYPES from '@initial-service/constant/types';
import HelloService from '@initial-service/service/hello/hello';
import HelloServiceImpl from '@initial-service/service/hello/impl/hello-impl';

const container = new Container();
container.bind<HelloService>(TYPES.HelloService).to(HelloServiceImpl);

export default container;