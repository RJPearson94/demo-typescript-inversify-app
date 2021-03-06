# @rjpearson94/cloud-function

This example application to prototype TypeScript & Dependency Injection comprises of many programming languages, frameworks, etc. to build, test and deploy the application.

The application is currently designed to run on Google Cloud Platform (GCP). The application uses the following GCP resources:

- [Storage](https://cloud.google.com/storage/)
- [Cloud Function](https://cloud.google.com/functions/)

## Getting Started

To be able to build and test you need the following:

- [Yarn 2/ Berry](https://yarnpkg.com/)

## Scripts

- test (Run all tests)
- test:unit (Run unit tests & generate coverage report)
- build (Builds cloud function zip)

For the full script list please see the [package.json](./package.json)

The scripts can be run using the following

Open a command prompt in this directory and run

```sh
yarn <script>
```

## Deploying to GCP

As mentioned above the cloud function can be deployed to GCP using various Infrastructure as Code (IaC) tools.

**NOTE:** Currently this project only supports Terraform.

To deploy the cloud function using Terraform visit the [Terraform Infrastructure folder](./infrastructure/terraform) for more details

**NOTE:** Please be aware cost/ charges may be incurred from deploying this cloud function (and supporting resources) onto GCP
