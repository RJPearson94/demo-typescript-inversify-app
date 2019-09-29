import { Context as AWSContext } from 'aws-lambda';

import GreetingController from '@src/controller/greeting';

export default interface Context extends AWSContext {
    greetingController: GreetingController;
}