import 'reflect-metadata';
import TYPES from "@src/constant/types";
import GreetingController from "@src/controller/greeting";
import container from "@src/inversify.config";

describe("#Lambda", () => {

    beforeEach(() => {
        container.snapshot()
    });

    afterEach(() => {
        container.restore()
    });

    test("Should return HelloTest when lambda is invoked", (done) => {
        // Setup
        const mockGreetFunction = jest.fn().mockReturnValue("HelloTest");
        const greetingController: GreetingController = {
            greet: mockGreetFunction
        };

        container.unbind(TYPES.GreetingController);
        container.bind<GreetingController>(TYPES.GreetingController).toConstantValue(greetingController);

        // Given
        const event: any = {};
        const context: any = {}

        // When
        const lambda = require("@src/lambda");
        lambda.handler(event, context, (error: any, response: any) => {
            expect(error).toBeNull();
            expect(response).toBeDefined();

            expect(mockGreetFunction).toBeCalled();

            expect(response.statusCode).toEqual(200);
            expect(JSON.parse(response.body)).toEqual({
                message: "HelloTest"
            });

            done();
        });

        // Then
        // The callback should assert
    });
});
