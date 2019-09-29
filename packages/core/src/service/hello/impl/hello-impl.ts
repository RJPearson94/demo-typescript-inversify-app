import { injectable } from 'inversify';

import { HelloService } from '@src/service/hello/hello';

@injectable()
export class HelloServiceImpl implements HelloService {
  public sayHello(): string {
    return 'Hello';
  }
}
