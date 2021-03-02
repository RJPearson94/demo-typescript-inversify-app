import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { Context } from '../lib';

export type MiddlewareConfig = middy.Middleware<unknown>;
export type APIGatewayProxyMiddleware = middy.MiddlewareObject<APIGatewayProxyEvent, APIGatewayProxyResult, Context>;
