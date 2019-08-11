import { Container } from 'inversify';

import TYPES from '@shared/constant/types';
import HelloService from '@shared/service/hello/hello';
import HelloServiceImpl from '@shared/service/hello/impl/hello-impl';

const container = new Container();
container.bind<HelloService>(TYPES.HelloService).to(HelloServiceImpl);

export default container;
