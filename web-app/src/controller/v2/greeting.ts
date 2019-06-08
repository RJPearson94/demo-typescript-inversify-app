import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import TYPES from '@shared/constant/types';
import HelloService from '@shared/service/hello/hello';

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