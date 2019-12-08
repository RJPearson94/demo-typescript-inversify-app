import { container } from '@rjpearson94/core';

import { TYPES } from '@src/constant/types';
import { GreetingController, GreetingControllerImpl } from '@src/controller';

container.bind<GreetingController>(TYPES.GreetingController).to(GreetingControllerImpl);

export { container };
