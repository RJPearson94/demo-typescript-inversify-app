import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';

import TYPES from '@core/constant/types';
import HelloService from '@core/service/hello/hello';

import GreetingResponse from '@src/controller/v2/model/greeting-response';

@controller('/v2')
export default class V2GreetingController {
  public constructor(@inject(TYPES.HelloService) private helloService: HelloService) {}

  @httpGet('/')
  public greet(): GreetingResponse {
    return {
      message: 'Say' + this.helloService.sayHello()
    };
  }
}
