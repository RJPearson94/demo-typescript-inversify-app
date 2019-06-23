import { injectable } from 'inversify';

import HelloService from '@shared/service/hello/hello';

@injectable()
class HelloServiceImpl implements HelloService {
  sayHello(): string {
    return 'Hello';
  }
}

export default HelloServiceImpl;
