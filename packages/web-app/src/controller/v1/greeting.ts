import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';

import { TYPES, HelloService } from '@rjpearson94/core';

@controller('/v1')
export default class V1GreetingController {
  public constructor(@inject(TYPES.HelloService) private helloService: HelloService) {}

  @httpGet('/')
  public greet(): string {
    return this.helloService.sayHello();
  }
}
