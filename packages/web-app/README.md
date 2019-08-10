# Example Typescript Inversify Express App

Example app to prototype Dependency Injection in TypeScript.

Dependencies used include:

- Typescript
- Typescript Aliases
- Inversify
- Inversify Express Utils

For the full list see `package.json`

## Prerequisites

You will need:

- Create .env file `Run cp .env.example .env`
- Populate .env with all the necessary values
- Yarn (code written using v1.16.0)
- Command Prompt

Yarn can be downloaded from <https://yarnpkg.com>

Once you have Yarn installed, open a command prompt and run `yarn install`. This command will download all the necessary dependencies.

## Scripts

The tests and code coverage report can be run from the command line by opening the command prompt in the project folder and running the following command `yarn test`.
This command will run both unit & integration tests

- To run unit tests only, please run `yarn test:unit`
- To run integration tests only, please run `yarn test:integration`

The app can be run from the command line by opening the command prompt in the project folder and running the following command `yarn start`
**Please note:** if another application is already running on the port specified in the .env then an error will appear

## Running the application

The application can be run as a standalone app or within a Docker container

For both you will need:

- To open a command prompt in the web-app directory
- Run `yarn build`

For a standalone deployment run the following command:

- `node dist/main.js`

or both commands can be run using `yarn start`

To build the docker container and run the application you need to run the following commands:

- `docker image build -t inversify-web-app .`
- `docker run -p 3000:3000 inversify-web-app`

The app should be running on Port 3000

## API Docs

The API Docs can be viewed in the api/docs folder

The docs are written using the OpenAPI 3.0 spec. For more information, see <https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md>

The docs can also be viewed in a Swagger UI. For more information on Swagger UI, see <https://swagger.io/tools/swagger-ui/>

The API docs can be run as a docker container, you need to run the following commands:

- `docker image build -t inversify-express-api ./api/`
- `run -p 8080:8080 inversify-express-api`

The API docs should now be available at <http://localhost:8080/>

## Postman Tests

To test the end 2 end solution, Postman is used.

The Postman Scripts can be seen in the postman-scripts folder

### Running Postman Tests via GUI

To run the postman scripts via the Postman GUI.

#### Prerequisites

In addition to the prerequistes above, you also need:

- Postman <https://www.getpostman.com>

Setup

- Import the web-app collection (found within the postman-scripts folder)
- Configure Environment to run the tests against (Add Variable URL and set the initial value as the Container URL)

To run an individual script/ request

- Click on script/ request you wan to run
- Click Send Request
- Verify Tests Results

Alternatively you can use the Postman Collection Runner.

- Open Collection Runner
- Select the imported web-app collection
- Select the environment
- Click Start Run
- Verify Tests Results

### Running Postman Tests via CLI

To run the postman scripts via the CLI, Newman test runner is used. To run the Newman tests, please run the following command

`yarn newman run postman-scripts/web-app.collection.json --env-var "URL=<<CONTAINER_URL>>" -r cli`

For more information on Postman, see <https://www.getpostman.com/>

For more information on Newman, see <https://github.com/postmanlabs/newman>

### E2E Tests

To run E2E tests a combination of Terratests (to run Docker Compose Commands) and Newman (to run the postman scripts) is used.

To run the E2E tests

- Change into the e2e directory
- Run `go test`

**NOTE:** Go modules are being used. Running `go test` will download all of the necessary dependencies
