import middy from '@middy/core';

import { MessageResponse } from './lib';
import { lambdaProxyMiddleware } from './middleware';

const apiGatewayHandler = async (): Promise<MessageResponse> => {
  return {
    message: 'Hello World'
  };
};

export const handler = middy(apiGatewayHandler).use(lambdaProxyMiddleware());
