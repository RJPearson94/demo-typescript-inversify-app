import { injectable, inject } from 'inversify';

import TYPES from '@core/constant/types';
import HelloService from '@core/service/hello/hello';

import GreetingController from '@src/controller/greeting';

@injectable()
export default class GreetingControllerImpl implements GreetingController {
  public constructor(@inject(TYPES.HelloService) private helloService: HelloService) {}

  public greet(): string {
    return this.helloService.sayHello() + 'Lambda';
  }
}
