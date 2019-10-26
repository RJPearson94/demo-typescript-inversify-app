import 'reflect-metadata';
import 'source-map-support/register';

import middy from 'middy';
import { APIGatewayProxyEvent } from 'aws-lambda';

import { MessageResponse, Context } from '@src/lib';
import { inversifyMiddleware, lambdaProxyMiddleware } from '@src/middleware';

const apiGatewayHandler = async (_: APIGatewayProxyEvent, { greetingController }: Context): Promise<MessageResponse> => {
  const helloResponse = greetingController.greet();
  return {
    message: helloResponse
  };
};

exports.handler = middy(apiGatewayHandler)
  .use(inversifyMiddleware())
  .use(lambdaProxyMiddleware());
