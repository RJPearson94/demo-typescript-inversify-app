import 'reflect-metadata';
import 'source-map-support/register';

import { TYPES } from './constant/types';
import { GreetingController } from './controller';
import { container } from './inversify.config';
import { MessageResponse } from './lib';

const twilioHandler = async (_context: any, _event: any, callback: (err: Error, resp: MessageResponse) => void): Promise<void> => {
  const greetingController = container.get<GreetingController>(TYPES.GreetingController);
  const helloResponse = greetingController.greet();

  callback(null, {
    message: helloResponse
  });
};

export const handler = twilioHandler;
