import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';

import TYPES from '@initial-service/constant/types';
import HelloService from '@initial-service/service/hello/hello';

@controller('/v2')
class V2GreetingController {

  public constructor(
    @inject(TYPES.HelloService) private _helloService: HelloService
  ) {}

  @httpGet('/')
  greet(): string {
    return 'Say' + this._helloService.sayHello();
  }
}

export default V2GreetingController;