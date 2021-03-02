import 'reflect-metadata';
import 'source-map-support/register';

import { AzureFunction, HttpRequest, Context } from '@azure/functions';

import { TYPES } from './constant/types';
import { GreetingController } from './controller';
import { container } from './inversify.config';

const httpEventHandler: AzureFunction = async (context: Context, _req: HttpRequest): Promise<void> => {
  const greetingController = container.get<GreetingController>(TYPES.GreetingController);
  const helloResponse = greetingController.greet();

  context.res = {
    body: {
      message: helloResponse
    }
  };
};

export const handler = httpEventHandler;
