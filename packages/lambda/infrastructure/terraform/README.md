# @rjpearson94/lambda-terraform-infrastructure

This package is responsible for deploying the lambda to AWS using [Terraform](https://www.terraform.io/) and [Terragrunt](https://github.com/gruntwork-io/terragrunt)

## Getting Started

To be able to test and run the lambda function on real AWS infrastructure you need the following:

- [AWS Account](https://aws.amazon.com/)
- [AWS CLI](https://aws.amazon.com/cli/) (configured)
- [Make](https://www.gnu.org/software/make/manual/make.html)
- [Terraform](https://www.terraform.io/) (v0.14 or above)
- [Terragrunt](https://github.com/gruntwork-io/terragrunt) (v0.28 or above)

To be able to run the integration & E2E tests you also need the following:

- [Golang](https://golang.org/) (v1.14 or above)

**NOTE:** To run the terratests the Terraform version must match the terraform version in the [go module file](../../../utility/terratest/go.mod) used by the terratests. If the versions do not match then an error will occur

## Commands

- download (download all dependencies)
- test (Run all tests)
- integration-test (Run integration tests)
- e2e-test (Run e2e tests)

For the full commands list please see the [makefile](./makefile)

The commands can be run using the following

Open a command prompt in this directory and run

```sh
make <script>
```

**NOTE:** Before the lambda resources can be managed via Terraform (creation, updating, destruction) or before integration and e2e tests can be run, the lambda function zip must be built and stored in the dist folder of the lambda package. If the zip is not built you will need to follow the instructions in the lambda [README](../../README.md)

## Deploying to AWS

To see what resources will be provisioned, change into the deployment folder and run the following:

```bash
make plan
```

This will show you all the resources that will be provisioned, including:

- [API Gateway](https://aws.amazon.com/api-gateway/)
- [Lambda](https://aws.amazon.com/lambda/)

If you want to provision these resources, please run the following command (Please note cost/ charges may be incurred):

```bash
make deploy
```

When you see`[terragrunt] Are you sure you want to run 'terragrunt apply' in each folder of the stack described above? (y/n)` type `y` and hit the return/ enter key. Alternatively, if you don't want the manual accept process you can run the following command:

```bash
make deploy DEPLOYARGS="--terragrunt-non-interactive"
```

The resources should be provisioned

## Remove Resources from AWS

Once you are finished with the resources you can remove all the provisioned resources by running the following command (from the deployment folder):

```bash
make destroy
```

When you see `[terragrunt] Are you sure you want to run 'terragrunt destroy' in each folder of the stack described above? (y/n)` type `y` and hit the return/ enter key. Alternatively, if you don't want the manual accept process you can run the following command:

```bash
make destroy DESTROYARGS="--terragrunt-non-interactive"
```

Then all the resources (which Terraform/ Terragrunt has state information for) should be removed.
