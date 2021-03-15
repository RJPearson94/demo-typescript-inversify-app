import 'reflect-metadata';

import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';

import { MessageResponse, Context } from './lib';
import { inversifyMiddleware, lambdaProxyMiddleware } from './middleware';

const apiGatewayHandler = async (_: APIGatewayProxyEvent, { greetingController }: Context): Promise<MessageResponse> => {
  const helloResponse = greetingController.greet();
  return {
    message: helloResponse
  };
};

export const handler = middy(apiGatewayHandler).use(inversifyMiddleware()).use(lambdaProxyMiddleware());
