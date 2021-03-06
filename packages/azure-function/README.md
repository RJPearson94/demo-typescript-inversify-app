# @rjpearson94/azure-function

This example application to prototype TypeScript & Dependency Injection comprises of many programming languages, frameworks, etc. to build, test and deploy the application.

The application is currently designed to run on Microsoft Azure. The application uses the following Azure resources:

[Functions](https://azure.microsoft.com/en-gb/services/functions/)
[Blob Storage](https://azure.microsoft.com/en-gb/services/storage/blobs/)

## Getting Started

To be able to build and test you need the following:

- [Yarn 2/ Berry](https://yarnpkg.com/)

## Scripts

- test (Run all tests)
- test:unit (Run unit tests & generate coverage report)
- build (Builds azure function zip)

For the full script list please see the [package.json](./package.json)

The scripts can be run using the following

Open a command prompt in this directory and run

```sh
yarn <script>
```

## Deploying to Azure

As mentioned above the function can be deployed to Azure using various Infrastructure as Code (IaC) tools.

**NOTE:** Currently this project only supports Terraform.

To deploy the Azure function using Terraform visit the [Terraform Infrastructure folder](./infrastructure/terraform) for more details

**NOTE:** Please be aware cost/ charges may be incurred from deploying this function (and supporting resources) onto Azure
