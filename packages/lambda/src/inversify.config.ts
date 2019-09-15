import { inversifyContainer } from '@rjpearson94/core';

import TYPES from '@src/constant/types';
import GreetingController from '@src/controller/greeting';
import GreetingControllerImpl from '@src/controller/impl/greeting-impl';

inversifyContainer.bind<GreetingController>(TYPES.GreetingController).to(GreetingControllerImpl);

export default inversifyContainer;
