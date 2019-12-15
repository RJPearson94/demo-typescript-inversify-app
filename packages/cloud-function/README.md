# @rjpearson94/cloud-function

This example application to prototype TypeScript & Dependency Injection comprises of many programming languages, frameworks, etc. to build, test and deploy the application.

The application is currently designed to run on Google Cloud.

To be able to deploy all of the GCP infrastructure, the following IaC tools are used:

- [Terraform](https://www.terraform.io/)
- [Terragrunt](https://github.com/gruntwork-io/terragrunt)

## Getting Started

To be able to test and run the cloud function on real GCP infrastructure you need the following:

- [GCP Account](https://cloud.google.com/)
- [Cloud SDK](https://cloud.google.com/sdk/) (configured)
- [Terraform](https://www.terraform.io/) (v0.12 or above)
- [Terragrunt](https://github.com/gruntwork-io/terragrunt) (v0.19 or above)

## Scripts

- test (Run all tests)
- test:unit (Run unit tests & generate coverage report)
- build (bundle cloud function code)

For the full script list please see the [package.json](./package.json)

The scripts can be run using the following

Open a command prompt in this directory and run

```sh
yarn <script>
```

## Deploying to GCP

If you want to easily get this project up and running on GCP you need to run the following commands:

```bash
yarn install
yarn build
```

These commands will install all dependencies and build the function artefact. To see what resources will be provisioned, change into the deployment folder and run the following:

```bash
terragrunt plan-all
```

This will show you all the resources that will be provisioned, including:

- [Storage](https://cloud.google.com/storage/)
- [Cloud Function](https://cloud.google.com/functions/)

If you want to provision these resources, please run the following command (Please note cost/ charges may be incurred):

```bash
terragrunt apply-all
```

When you see `[terragrunt] Are you sure you want to run 'terragrunt apply' in each folder of the stack described above? (y/n)` type `y` and hit the return/ enter key. Alternatively if you don't want the manual accept process you can run the following command:

```bash
terragrunt apply-all --terragrunt-non-interactive
```

The resources should be provisioned (Please note this may take a couple of minutes to provision all resources)

**NOTE:** If you already have resources i.e. Buckets then feel free to modify the terraform/ terragrunt to meet you needs.

## Remove Resources from GCP

Once you are finished with the resources you can remove all the provisioned resources by running the following command (from from the deployment folder):

```bash
terragrunt destroy-all
```

When you see `[terragrunt] Are you sure you want to run 'terragrunt destroy' in each folder of the stack described above? (y/n)` type `y` and hit the return/ enter key. Alternatively if you don't want the manual accept process you can run the following command:

```bash
terragrunt destroy-all --terragrunt-non-interactive
```

Then all the resources (which Terraform/ Terragrunt has state information for) should be removed.
