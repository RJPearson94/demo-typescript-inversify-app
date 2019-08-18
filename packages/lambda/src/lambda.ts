import 'reflect-metadata';

import container from '@src/inversify.config';
import TYPES from '@src/constant/types';
import GreetingController from '@src/controller/greeting';

const greetingController: GreetingController = container.get<GreetingController>(TYPES.GreetingController);

exports.handler = function(event: any, context: any, callback: Function): void {
  const helloResponse = greetingController.greet();
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: helloResponse
    })
  });
};
