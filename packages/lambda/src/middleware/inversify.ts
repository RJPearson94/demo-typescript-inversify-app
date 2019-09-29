import { Middleware } from 'middy';

import { container } from '@src/inversify.config';
import { TYPES } from '@src/constant/types';
import { GreetingController } from '@src/controller/greeting';

export const inversifyMiddleware: Middleware<{}> = () => ({
  before: (handler, next) => {
    Object.assign(handler.context, {
      greetingController: container.get<GreetingController>(TYPES.GreetingController)
    });
    next();
  }
});
