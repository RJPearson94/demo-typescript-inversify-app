import 'reflect-metadata';
import 'source-map-support/register';

import middy from 'middy';
import { APIGatewayEvent } from 'aws-lambda';

import APIResponse from '@src/lib/apiResponse';
import Context from '@src/lib/context';
import inversifyMiddleware from '@src/middleware/inversify';

const apiGatewayHandler = async (event: APIGatewayEvent, context: Context): Promise<APIResponse> => {
  const helloResponse = context.greetingController.greet();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: helloResponse
    })
  };
};

exports.handler = middy(apiGatewayHandler).use(inversifyMiddleware());
