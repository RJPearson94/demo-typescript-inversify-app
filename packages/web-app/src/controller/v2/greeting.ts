import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';

import { TYPES, HelloService } from '@rjpearson94/core';

import { GreetingResponse } from '../../controller/v2/model/greeting-response';

@controller('/v2')
export class V2GreetingController {
  public constructor(@inject(TYPES.HelloService) private helloService: HelloService) {}

  @httpGet('/')
  public greet(): GreetingResponse {
    return {
      message: 'Say' + this.helloService.sayHello()
    };
  }
}
