import { MiddlewareConfig, APIGatewayProxyMiddleware } from '@src/middleware';
import { container } from '@src/inversify.config';
import { TYPES } from '@src/constant/types';
import { GreetingController } from '@src/controller/greeting';

export const inversifyMiddleware: MiddlewareConfig = (): APIGatewayProxyMiddleware => ({
  before: (handler, next) => {
    handler.context.greetingController = container.get<GreetingController>(TYPES.GreetingController);
    next();
  }
});
