# @rjpearson94/lambda-cdk-infrastructure

This package is responsible for deploying the lambda to AWS using [CDK](https://aws.amazon.com/cdk/)

## Getting Started

To be able to run the lambda function on real AWS infrastructure you need the following:

- [AWS Account](https://aws.amazon.com/)
- [AWS CLI](https://aws.amazon.com/cli/) (configured)
- [Yarn 2/ Berry](https://yarnpkg.com/)

## Commands

- synth (Generate CloudFormation template)
- test (Run all tests)

For the full commands list please see the [package.json](./package.json)

The commands can be run using the following

Open a command prompt in this directory and run

```sh
yarn install
yarn <script>
```

**NOTE:** Before the lambda resources can be managed via CDK (creation, updating, destruction), the lambda function zip must be built and stored in the dist folder of the lambda package. If the zip is not built you will need to follow the instructions in the lambda [README](../../README.md)

## Deploying to AWS

To see what resources will be provisioned, change into the deployment folder and run the following:

```bash
yarn synth
```

This will show you all the resources that will be provisioned, including:

- [API Gateway](https://aws.amazon.com/api-gateway/)
- [Lambda](https://aws.amazon.com/lambda/)

If you want to provision these resources, please run the following command (Please note cost/ charges may be incurred):

```bash
yarn deploy
```

When you see `Do you wish to deploy these changes (y/n)?` type `y` and hit the return/ enter key. Alternatively, if you don't want the manual accept process you can run the following command:

```bash
yarn deploy --require-approval never
```

The resources should be provisioned

## Remove Resources from AWS

Once you are finished with the resources you can remove all the provisioned resources by running the following command (from the deployment folder):

```bash
yarn destroy
```

When you see `Are you sure you want to delete: greeting-function-cdk (y/n)?` type `y` and hit the return/ enter key.

Then all the resources (which CloudFormation has state information for) should be removed.
