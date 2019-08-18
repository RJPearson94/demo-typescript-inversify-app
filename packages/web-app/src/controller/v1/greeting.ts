import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';

import TYPES from '@core/constant/types';
import HelloService from '@core/service/hello/hello';

@controller('/v1')
export default class V1GreetingController {
  public constructor(@inject(TYPES.HelloService) private helloService: HelloService) {}

  @httpGet('/')
  public greet(): string {
    return this.helloService.sayHello();
  }
}
