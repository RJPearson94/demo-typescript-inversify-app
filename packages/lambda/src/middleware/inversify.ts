import { MiddlewareConfig, APIGatewayProxyMiddleware } from '../middleware';
import { container } from '../inversify.config';
import { TYPES } from '../constant/types';
import { GreetingController } from '../controller/greeting';

export const inversifyMiddleware: MiddlewareConfig = (): APIGatewayProxyMiddleware => ({
  before: (handler, next) => {
    handler.context.greetingController = container.get<GreetingController>(TYPES.GreetingController);
    next();
  }
});
