import { injectable } from 'inversify';

import HelloService from '@src/service/hello/hello';

@injectable()
export default class HelloServiceImpl implements HelloService {
  public sayHello(): string {
    return 'Hello';
  }
}
