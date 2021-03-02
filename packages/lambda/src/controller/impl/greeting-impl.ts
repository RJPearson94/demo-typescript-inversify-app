import { injectable, inject } from 'inversify';

import { TYPES, HelloService } from '@rjpearson94/core';

import { GreetingController } from '../../controller/greeting';

@injectable()
export class GreetingControllerImpl implements GreetingController {
  public constructor(@inject(TYPES.HelloService) private helloService: HelloService) {}

  public greet(): string {
    return this.helloService.sayHello() + 'Lambda';
  }
}
