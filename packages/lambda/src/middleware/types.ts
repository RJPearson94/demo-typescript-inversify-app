import { Middleware, MiddlewareObject } from 'middy';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { Context } from '@src/lib';

export type MiddlewareConfig = Middleware<{}>;
export type APIGatewayProxyMiddleware = MiddlewareObject<APIGatewayProxyEvent, APIGatewayProxyResult, Context>;
