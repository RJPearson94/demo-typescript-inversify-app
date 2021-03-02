import { Context as AWSContext } from 'aws-lambda';

import { GreetingController } from '../controller/greeting';

export interface Context extends AWSContext {
  greetingController: GreetingController;
}
