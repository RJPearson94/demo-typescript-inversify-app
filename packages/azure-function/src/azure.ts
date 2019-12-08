import 'reflect-metadata';
import 'source-map-support/register';

import { AzureFunction, HttpRequest, Context } from '@azure/functions';

import { TYPES } from '@src/constant/types';
import { GreetingController } from '@src/controller';
import { container } from '@src/inversify.config';

const httpEventHandler: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
  const greetingController = container.get<GreetingController>(TYPES.GreetingController);
  const helloResponse = greetingController.greet();

  context.res = {
    body: {
      message: helloResponse
    }
  };
};

exports.handler = httpEventHandler;
