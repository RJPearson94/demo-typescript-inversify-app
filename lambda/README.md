# Example Typescript Inversify Lambda App

Example lambda app to prototype Dependency Injection in TypeScript.

## Prerequisites

You will need:

* Serverless Framework installed
* Yarn (code written using v1.16.0)
* Command Prompt

Yarn can be downloaded from <https://yarnpkg.com>

Once you have Yarn installed, open a command prompt and run `yarn install`. This command will download all the necessary dependencies.

## Scripts

The tests and code coverage report can be run from the command line by opening the command prompt in the project folder and running the following command `yarn test`

## Running the application

The application is run in conjuction with the serverless framework

To run the application locally you will need to:

* To open a command prompt in the lambda directory
* Run `yarn invoke`

To deploy the application onto AWS infrastructure. Run the following command

* `yarn serverless:aws`
