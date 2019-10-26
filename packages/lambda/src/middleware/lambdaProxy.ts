import { Middleware } from 'middy';

export const lambdaProxyMiddleware: Middleware<{}> = () => ({
  after: (handler, next): void => {
    handler.response = {
      statusCode: 200,
      body: JSON.stringify(handler.response)
    };

    next();
  }
});
