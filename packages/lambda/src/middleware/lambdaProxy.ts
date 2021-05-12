import { APIGatewayProxyResult } from 'aws-lambda';
import { APIGatewayProxyMiddleware } from '../middleware';

const createResponse = (statusCode: number, body: string): APIGatewayProxyResult => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json'
  },
  body
});

export const lambdaProxyMiddleware = (): APIGatewayProxyMiddleware => ({
  after: async (handler): Promise<void> => {
    handler.response = createResponse(200, JSON.stringify(handler.response));
  },
  onError: async (handler): Promise<void> => {
    console.error({
      requestId: handler.context.awsRequestId,
      ...handler.error
    });
    handler.response = createResponse(500, 'An error occurred');
  }
});
