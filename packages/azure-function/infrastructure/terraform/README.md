# @rjpearson94/azure-function-terraform-infrastructure

This package is responsible for deploying the function to Azure using [Terraform](https://www.terraform.io/) and [Terragrunt](https://github.com/gruntwork-io/terragrunt)

## Getting Started

To be able to test and run the function on real Azure infrastructure you need the following:

- [Azure Account](https://azure.microsoft.com/en-gb/)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest)
- [Make](https://www.gnu.org/software/make/manual/make.html)
- [Terraform](https://www.terraform.io/) (v0.14 or above)
- [Terragrunt](https://github.com/gruntwork-io/terragrunt) (v0.28 or above)

## Prerequisites

Before the azure function resources can be managed via Terraform (creation, updating, destruction), the azure function zip must be built and stored in the dist folder of the azure-function package. If the zip is not built you will need to follow the instructions in the Azure function [README](../../README.md)

## Deploying to Azure

To deploy to Azure you first need to login into Azure using the Azure CLI. This is done by running the following command:

```bash
az login
```

You then need to set the subscription that you want to deploy the resources into. This is done by running the following command:

```bash
az account set --subscription "<<subscription_name>>"
```

For more information on using the Azure CLI with multiple subscriptions, please see: <https://docs.microsoft.com/en-us/cli/azure/manage-azure-subscriptions-azure-cli?view=azure-cli-latest>

Run the following command

```bash
make plan
```

This will show you all the resources that will be provisioned, including:

- [Resource Group](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-overview)
- [Storage](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview)
- [Function](https://azure.microsoft.com/en-gb/services/functions)

If you want to provision these resources, please run the following command (Please note cost/ charges may be incurred):

```bash
make deploy
```

When you see `[terragrunt] Are you sure you want to run 'terragrunt apply' in each folder of the stack described above? (y/n)` type `y` and hit the return/ enter key. Alternatively, if you don't want the manual accept process you can run the following command:

```bash
make deploy DEPLOYARGS="--terragrunt-non-interactive"
```

The resources should be provisioned (Please note this may take a couple of minutes to provision all resources)

**NOTE:** If you already have resources i.e. Resource Groups or Storage Accounts then feel free to modify the terraform/ terragrunt to meet your needs.

## Remove Resources from Azure

Once you are finished with the resources you can remove all the provisioned resources by running the following command (from the deployment folder):

```bash
make destroy
```

When you see `[terragrunt] Are you sure you want to run 'terragrunt destroy' in each folder of the stack described above? (y/n)` type `y` and hit the return/ enter key. Alternatively, if you don't want the manual accept process you can run the following command:

```bash
make destroy DESTROYARGS="--terragrunt-non-interactive"
```

Then all the resources (which Terraform/ Terragrunt has state information for) should be removed.
