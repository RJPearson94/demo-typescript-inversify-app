# @rjpearson94/web-app

This example application to prototype TypeScript & Dependency Injection comprises of many programming languages, frameworks, etc. to build, test and deploy the application.

The express web application can be run standalone or within a docker container. **NOTE:** E2E tests are performed on the docker container

To build and test the docker container, the following programming language and framework is used:

- [Golang](https://golang.org/)
- [Terratest](https://github.com/gruntwork-io/terratest)

## Getting Started

To be able to build, test and run the dockerized web-app you need the following:

- [Docker](https://www.docker.com/) (installed & running)

To be able to run the E2E tests you also need the following:

- [Golang](https://golang.org/) (v1.12 or above)

## Scripts

- test (Run all tests)
- test:unit (Run unit tests & generate coverage report)
- test:integration (Run integration tests & generate coverage report)
- test:e2e (Run e2e tests)
- build (build web-app artefact)
- start (start the standalone web application)

For the full script list please see the [package.json](./package.json)

**NOTE:** if another application is already running on the port specified in the environment variable or .env file then an error will occur

The scripts can be run using the following

Open a command prompt in this directory and run

```sh
yarn <script>
```

## Running the application

The application can be run as a standalone app or within a Docker container

For both you will need:

- The built web-app artefact

For a standalone deployment please run the **start** script detailed above. To build the docker container and run the application you need to run the following commands:

- `docker image build -t inversify-web-app .`
- `docker run -p 3000:3000 inversify-web-app`

The app should be running on Port 3000

## API Docs

The API Docs can be viewed in the api/docs folder

The docs are written using the OpenAPI 3.0 spec. For more information, see <https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md>

The docs can also be viewed using Redoc or Swagger UI. For more information on Redoc, see <https://github.com/Redocly/redoc> and for Swagger UI, see <https://swagger.io/tools/swagger-ui/>

The API docs can be run using node (using Redoc), you need to run the following command:

`yarn api-docs:view`

The API docs should now be available at <http://localhost:5000/>

Alternatively the API docs can be run as a docker container (using Swagger UI), you need to run the following commands:

- `docker image build -t inversify-express-api ./api/`
- `run -p 8080:8080 inversify-express-api`

The API docs should now be available at <http://localhost:8080/>

## Postman

To test the solution including the API, Postman is used.

The Postman Scripts can be found in the postman-scripts folder

**NOTE:** These postman tests are run as part of the E2E tests

### Running Postman Tests via GUI

To run the postman scripts via the Postman GUI.

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
