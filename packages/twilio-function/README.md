# @rjpearson94/twilio-function

This example application to prototype TypeScript & Dependency Injection comprises of many programming languages, frameworks, etc. to build, test and deploy the application.

The application is currently designed to run on Twilio. The application uses the following Twilio resources:

- [Functions](https://www.twilio.com/docs/runtime/functions)

## Getting Started

To be able to build and test you need the following:

- [Yarn 2/ Berry](https://yarnpkg.com/)

## Scripts

- test (Run all tests)
- test:unit (Run unit tests & generate coverage report)
- build

For the full script list please see the [package.json](./package.json)

The scripts can be run using the following

Open a command prompt in this directory and run

```sh
yarn <script>
```

## Deploying to Twilio

As mentioned above the function can be deployed to Twilio using various Infrastructure as Code (IaC) tools and the Twilio CLI.

To deploy the Twilio function using Terraform visit the [Terraform Infrastructure folder](./infrastructure/terraform) for more details

To deploy the Twilio function using CDK for Terraform visit the [CDKTF Infrastructure folder](./infrastructure/cdktf) for more details

**NOTE:** Please be aware cost/ charges may be incurred from deploying this Twilio function (and supporting resources) onto Twilio
