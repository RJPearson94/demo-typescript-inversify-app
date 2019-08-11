# @rjpearson94/lambda

This example application to prototype TypeScript & Dependency Injection comprises of many programming languages, frameworks, etc. to build, test and deploy the application.

The application is currently designed to run on Amazon Web Service (AWS). The application uses the following AWS services:

- [API Gateway](https://aws.amazon.com/api-gateway/)
- [Lambda](https://aws.amazon.com/lambda/)
- [Cloudwatch](https://aws.amazon.com/cloudwatch/)
- [IAM](https://aws.amazon.com/iam/)

A high level architecture can be seen below

![architecture diagram](./diagrams/Architecture.jpg)

To be able to deploy all of the AWS infrastructure, the following IaC tools are used:

- [Terraform](https://www.terraform.io/)
- [Terragrunt](https://github.com/gruntwork-io/terragrunt)

To test the AWS infrastructure that is provisioned, the following programming language and framework is used:

- [Golang](https://golang.org/)
- [Terratest](https://github.com/gruntwork-io/terratest)

## Getting Started

To be able to test and run the lambda function on real AWS infrastructure you need the following:

- [AWS Account](https://aws.amazon.com/)
- [AWS CLI](https://aws.amazon.com/cli/) (configured)
- [Terraform](https://www.terraform.io/) (v0.12 or above)
- [Terragrunt](https://github.com/gruntwork-io/terragrunt) (v0.19 or above)

To be able to run the component, integration & E2E tests you also need the following:

- [Golang](https://golang.org/) (v1.12 or above)

**NOTE:** To run the terratests the Terraform version must match the terraform version in the [go module file](../utility/terratest/go.mod) used by the terratests. If the versions do not match then an error will occur

## Scripts

- test (Run all tests)
- test:unit (Run unit tests & generate coverage report)
- test:component (Run component tests)
- test:integration (Run integration tests)
- test:e2e (Run e2e tests)
- build (build lambda artefact zip)

For the full script list please see the [package.json](./package.json)

The scripts can be run using the following

Open a command prompt in the root directory and run the following command

```sh
yarn lerna <script>
```

**NOTE:** This will run the script on all packages.

If you want to run the script for this package only, then please use

```sh
yarn lerna --scope @rjpearson94/lambda <script>
```

Alternatively you can use yarn to run these commands, to do this please open a command prompt in this directory and run

```sh
yarn <script>
```

## Postman

To test the solution including the API, Postman is used.

The Postman Scripts can be seen in the postman-scripts folder

**NOTE:** These postman tests are run as part of the E2E tests

### Running Postman Tests via GUI

To run the postman scripts via the Postman GUI.

#### Prerequisites

In addition to the prerequisites above, you also need:

- Postman <https://www.getpostman.com>

Setup

- Import the lambda collection (found within the postman-scripts folder)
- Configure Environment to run the tests against (Add Variable URL and set the initial value as the API Gateway URL)

To run an individual script/ request

- Click on script/ request you wan to run
- Click Send Request
- Verify Tests Results

Alternatively you can use the Postman Collection Runner.

- Open Collection Runner
- Select the imported lambda collection
- Select the environment
- Click Start Run
- Verify Tests Results

### Running Postman Tests via CLI

To run the postman scripts via the CLI, Newman test runner is used. To run the Newman tests, please run the following command

`yarn newman run postman-scripts/lambda.collection.json --env-var "URL=<<API_GATEWAY_URL>>" -r cli`

**NOTE:** These postman tests are run as part of the E2E tests

For more information on Postman, see <https://www.getpostman.com/>

For more information on Newman, see <https://github.com/postmanlabs/newman>

## Terraform

This module will provision and configure a API Gateway and lambda function.

### Terraform Docs

#### Inputs

| Name          | Description                            |  Type  | Default | Required |
| ------------- | -------------------------------------- | :----: | :-----: | :------: |
| log_retention | Max duration to retain cloudwatch logs | string | `"14"`  |    no    |
| tags          | AWS tags to be applied to resources    |  map   |   n/a   |   yes    |

### Outputs

| Name       | Description                    |
| ---------- | ------------------------------ |
| invoke_url | The URL to invoke an API stage |

## Deploying to AWS

Instructions coming soon
