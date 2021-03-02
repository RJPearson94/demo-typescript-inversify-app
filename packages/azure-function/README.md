# @rjpearson94/azure-function

This example application to prototype TypeScript & Dependency Injection comprises of many programming languages, frameworks, etc. to build, test and deploy the application.

The application is currently designed to run on Microsoft Azure.

To be able to deploy all of the Azure infrastructure, the following IaC tools are used:

- [Terraform](https://www.terraform.io/)
- [Terragrunt](https://github.com/gruntwork-io/terragrunt)

## Getting Started

To be able to test and run the lambda function on real AWS infrastructure you need the following:

- [Azure Account](https://azure.microsoft.com/en-gb/)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest)
- [Terraform](https://www.terraform.io/) (v0.14 or above)
- [Terragrunt](https://github.com/gruntwork-io/terragrunt) (v0.21 or above)

## Scripts

- test (Run all tests)
- test:unit (Run unit tests & generate coverage report)
- build (bundle azure function code)

For the full script list please see the [package.json](./package.json)

The scripts can be run using the following

Open a command prompt in this directory and run

```sh
yarn <script>
```

## Deploying to Azure

To be deploy to azure you first need to login into Azure using the Azure CLI. This is done by running the following command:

```bash
az login
```

You then need to set the subscription that you want to deploy the resources into. This is done by running the following command:

```bash
az account set --subscription "<<subscription_name>>"
```

For more information on using the Azure CLI with multiple subscription, please see: <https://docs.microsoft.com/en-us/cli/azure/manage-azure-subscriptions-azure-cli?view=azure-cli-latest>

If you want to easily get this project up and running on Azure you need to run the following commands:

```bash
yarn install
yarn build
```

These commands will install all dependencies and build the function artefact. To see what resources will be provisioned, change into the deployment folder and run the following:

```bash
terragrunt plan-all
```

This will show you all the resources that will be provisioned, including:

- [Resource Group](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-overview)
- [Storage](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview)
- [Function](https://azure.microsoft.com/en-gb/services/functions)

If you want to provision these resources, please run the following command (Please note cost/ charges may be incurred):

```bash
terragrunt apply-all
```

When you see `[terragrunt] Are you sure you want to run 'terragrunt apply' in each folder of the stack described above? (y/n)` type `y` and hit the return/ enter key. Alternatively if you don't want the manual accept process you can run the following command:

```bash
terragrunt apply-all --terragrunt-non-interactive
```

The resources should be provisioned (Please note this may take a couple of minutes to provision all resources)

**NOTE:** If you already have resources i.e. Resource Groups or Storage Accounts then feel free to modify the terraform/ terragrunt to meet you needs.

## Remove Resources from Azure

Once you are finished with the resources you can remove all the provisioned resources by running the following command (from from the deployment folder):

```bash
terragrunt destroy-all
```

When you see `[terragrunt] Are you sure you want to run 'terragrunt destroy' in each folder of the stack described above? (y/n)` type `y` and hit the return/ enter key. Alternatively if you don't want the manual accept process you can run the following command:

```bash
terragrunt destroy-all --terragrunt-non-interactive
```

Then all the resources (which Terraform/ Terragrunt has state information for) should be removed.
