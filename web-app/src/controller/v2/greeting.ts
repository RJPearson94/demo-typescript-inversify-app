import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import TYPES from '@shared/constant/types';
import HelloService from '@shared/service/hello/hello';
import GreetingResponse from '@src/controller/v2/model/greeting-response';

@controller('/v2')
class V2GreetingController {
  public constructor(@inject(TYPES.HelloService) private helloService: HelloService) {}

  @httpGet('/')
  greet(): GreetingResponse {
    return {
      message: 'Say' + this.helloService.sayHello()
    };
  }
}

export default V2GreetingController;
