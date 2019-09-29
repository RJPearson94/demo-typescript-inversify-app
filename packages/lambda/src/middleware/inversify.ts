import { Middleware } from 'middy';
import container from '@src/inversify.config';
import TYPES from '@src/constant/types';
import GreetingController from '@src/controller/greeting';

const inversifyMiddleware: Middleware<{}> = () => {
  return {
    before: (handler, next) => {
      Object.assign(handler.context, {
        greetingController: container.get<GreetingController>(TYPES.GreetingController)
      });
      next();
    },
    after: (handler, next) => {
      next();
    },
    onError: (handler, next) => {
      next();
    }
  };
};

export default inversifyMiddleware;
