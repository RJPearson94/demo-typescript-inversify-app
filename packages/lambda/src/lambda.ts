import 'reflect-metadata';
import 'source-map-support/register';

import middy from 'middy';
import { APIGatewayEvent } from 'aws-lambda';

import { MessageResponse, Context } from '@src/lib';
import { inversifyMiddleware, lambdaProxyMiddleware } from '@src/middleware';

const apiGatewayHandler = async (_: APIGatewayEvent, context: Context): Promise<MessageResponse> => {
  const helloResponse = context.greetingController.greet();
  return {
    message: helloResponse
  };
};

exports.handler = middy(apiGatewayHandler)
  .use(inversifyMiddleware())
  .use(lambdaProxyMiddleware());
