import { APIGatewayProxyMiddleware } from '../middleware';
import { container } from '../inversify.config';
import { TYPES } from '../constant/types';
import { GreetingController } from '../controller/greeting';

export const inversifyMiddleware = (): APIGatewayProxyMiddleware => ({
  before: async handler => {
    handler.context.greetingController = container.get<GreetingController>(TYPES.GreetingController);
  }
});
