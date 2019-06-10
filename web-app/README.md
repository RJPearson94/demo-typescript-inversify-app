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

## Running the application

The application can be run as a standalone app or within a Docker container

For both you will need:

* To open a command prompt in the web-app directory
* Run `yarn build`

For a standalone deployment run the following command:

* `node dist/main.js`

To build the docker container and run the application you need to run the following commands:

* `docker image build -t inversify-web-app .`
* `docker run -p 3000:3000 inversify-web-app`

The app should be running on Port 3000
