import { container } from '@rjpearson94/core';

import { TYPES } from './constant/types';
import { GreetingController, GreetingControllerImpl } from './controller';

container.bind<GreetingController>(TYPES.GreetingController).to(GreetingControllerImpl);

export { container };
