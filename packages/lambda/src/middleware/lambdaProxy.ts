import { APIGatewayProxyResult } from 'aws-lambda';
import { MiddlewareConfig, APIGatewayProxyMiddleware } from '../middleware';

const createResponse = (statusCode: number, body: string): APIGatewayProxyResult => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json'
  },
  body
});

export const lambdaProxyMiddleware: MiddlewareConfig = (): APIGatewayProxyMiddleware => ({
  after: (handler, next): void => {
    handler.response = createResponse(200, JSON.stringify(handler.response));
    next();
  },
  onError: (handler, next): void => {
    console.error({
      requestId: handler.context.awsRequestId,
      ...handler.error
    });
    handler.response = createResponse(500, 'An error occurred');
    next();
  }
});
