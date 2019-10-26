import { MiddlewareConfig, APIGatewayProxyMiddleware } from '@src/middleware';

export const lambdaProxyMiddleware: MiddlewareConfig = (): APIGatewayProxyMiddleware => ({
  after: (handler, next): void => {
    handler.response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(handler.response)
    };
    next();
  }
});
