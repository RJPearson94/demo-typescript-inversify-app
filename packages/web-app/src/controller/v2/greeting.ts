import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import TYPES from '@shared/constant/types';
import HelloService from '@shared/service/hello/hello';
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