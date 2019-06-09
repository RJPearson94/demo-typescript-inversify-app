# Example Typescript Inversify Express App

Example app to prototype Dependency Injection in TypeScript.

Dependencies used include:

* Typescript
* Typescript Aliases
* Inversify
* Inversify Express Utils

For the full list see `package.json`

## Prerequisites

You will need:

* Create .env file `Run cp .env.example .env`
* Populate .env with all the necessary values
* Yarn (code written using v1.16.0)
* Command Prompt

Yarn can be downloaded from <https://yarnpkg.com>

Once you have Yarn installed, open a command prompt and run `yarn install`. This command will download all the necessary dependencies.

## Scripts

The tests and code coverage report can be run from the command line by opening the command prompt in the project folder and running the following command `yarn test`

The app can be run from the command line by opening the command prompt in the project folder and running the following command `yarn start`
**Please note:** if another application is already running on the port specified in the .env then an error will appear
