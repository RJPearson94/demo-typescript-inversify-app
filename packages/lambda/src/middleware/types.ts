import { Middleware, MiddlewareObject } from 'middy';
import { APIGatewayEvent, ProxyResult } from 'aws-lambda';

import { Context } from '@src/lib';

export type MiddlewareConfig = Middleware<{}>;
export type APIGatewayProxyMiddleware = MiddlewareObject<APIGatewayEvent, ProxyResult, Context>;
