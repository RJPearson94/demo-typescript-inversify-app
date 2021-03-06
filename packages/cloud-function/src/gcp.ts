import 'reflect-metadata';
import 'source-map-support/register';

import { Request, Response } from 'express';

import { TYPES } from './constant/types';
import { GreetingController } from './controller';
import { container } from './inversify.config';

const httpEventHandler = async (_: Request, response: Response): Promise<void> => {
  const greetingController = container.get<GreetingController>(TYPES.GreetingController);
  const helloResponse = greetingController.greet();

  response.status(200).json({
    message: helloResponse
  });
};

export const handler = httpEventHandler;
