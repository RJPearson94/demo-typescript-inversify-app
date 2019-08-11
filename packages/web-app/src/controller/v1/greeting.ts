import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import TYPES from '@shared/constant/types';
import HelloService from '@shared/service/hello/hello';

@controller('/v1')
export default class V1GreetingController {
  public constructor(@inject(TYPES.HelloService) private helloService: HelloService) {}

  @httpGet('/')
  public greet(): string {
    return this.helloService.sayHello();
  }
}
