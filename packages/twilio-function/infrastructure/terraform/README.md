# @rjpearson94/twilio-function-terraform-infrastructure

This package is responsible for deploying the function to Twilio using [Terraform](https://www.terraform.io/) and [Terragrunt](https://github.com/gruntwork-io/terragrunt)

## Getting Started

To be able to test and run the function on real Twilio infrastructure you need the following:

- [Twilio Account](https://www.twilio.com/)
- [Make](https://www.gnu.org/software/make/manual/make.html)
- [Terraform](https://www.terraform.io/) (v0.14 or above)
- [Terragrunt](https://github.com/gruntwork-io/terragrunt) (v0.28 or above)

## Prerequisites

Before the Twilio function resources can be managed via Terraform (creation, updating, destruction), the Twilio function javascript file must be built and stored in the dist folder of the twilio-function package. If the javascript file has not been built you will need to follow the instructions in the Twilio function [README](../../README.md)

## Deploying to Twilio

If you want to easily get this project up and running on Twilio you need to run the following commands:

```bash
make plan
```

This will show you all the resources that will be provisioned, including:

- [Functions](https://www.twilio.com/docs/runtime/functions)

If you want to provision these resources, please run the following command (Please note cost/ charges may be incurred):

```bash
make deploy
```

When you see `[terragrunt] Are you sure you want to run 'terragrunt apply' in each folder of the stack described above? (y/n)` type `y` and hit the return/ enter key. Alternatively, if you don't want the manual accept process you can run the following command:

```bash
make deploy DEPLOYARGS="--terragrunt-non-interactive"
```

The resources should be provisioned (Please note this may take a couple of minutes to provision all resources)

## Remove Resources from Twilio

Once you are finished with the resources you can remove all the provisioned resources by running the following command (from the deployment folder):

```bash
make destroy
```

When you see `[terragrunt] Are you sure you want to run 'terragrunt destroy' in each folder of the stack described above? (y/n)` type `y` and hit the return/ enter key. Alternatively, if you don't want the manual accept process you can run the following command:

```bash
make destroy DESTROYARGS="--terragrunt-non-interactive"
```

Then all the resources (which Terraform/ Terragrunt has state information for) should be removed.
