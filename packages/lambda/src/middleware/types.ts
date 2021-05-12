import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export type APIGatewayProxyMiddleware = middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult, Error>;
