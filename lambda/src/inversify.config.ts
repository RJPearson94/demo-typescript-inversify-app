import container from '@shared/inversify.config';
import TYPES from "@src/constant/types";
import GreetingController from "@src/controller/greeting";
import GreetingControllerImpl from "@src/controller/impl/greeting-impl";

container.bind<GreetingController>(TYPES.GreetingController).to(GreetingControllerImpl);

export default container;