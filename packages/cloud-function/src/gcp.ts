import 'reflect-metadata';
import 'source-map-support/register';

import { HttpFunction } from '@google-cloud/functions-framework';
import { Request, Response } from 'express';

import { TYPES } from '@src/constant/types';
import { GreetingController } from '@src/controller';
import { container } from '@src/inversify.config';

const httpEventHandler: HttpFunction = async (_: Request, response: Response): Promise<void> => {
  const greetingController = container.get<GreetingController>(TYPES.GreetingController);
  const helloResponse = greetingController.greet();

  response.status(200).json({
    message: helloResponse
  });
};

exports.handler = httpEventHandler;
