# @rjpearson94/lambda-cdktf-infrastructure

This package is responsible for deploying the lambda to AWS using [CDK for Terraform](https://github.com/hashicorp/terraform-cdk)

## Getting Started

To be able to run the lambda function on real AWS infrastructure you need the following:

- [AWS Account](https://aws.amazon.com/)
- [AWS CLI](https://aws.amazon.com/cli/) (configured)
- [Terraform](https://www.terraform.io/) (v0.14 or above)
- [Yarn 2/ Berry](https://yarnpkg.com/)

## Commands

- synth (Generate Terraform JSON template)
- test (Run all tests)

For the full commands list please see the [package.json](./package.json)

The commands can be run using the following

Open a command prompt in this directory and run

```sh
yarn install
yarn <script>
```

**NOTE:** Before the lambda resources can be managed via CDKTF (creation, updating, destruction), the lambda function zip must be built and stored in the dist folder of the lambda package. If the zip is not built you will need to follow the instructions in the lambda [README](../../README.md)

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

When you see the following:

```txt
Do you want to perform these actions?
  CDK for Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value:
```

type `yes` and hit the return/ enter key. Alternatively, if you don't want the manual accept process you can run the following command:

```bash
yarn deploy --auto-approve
```

The resources should be provisioned

## Remove Resources from AWS

Once you are finished with the resources you can remove all the provisioned resources by running the following command (from the deployment folder):

```bash
yarn destroy
```

When you see the following

```txt
Do you want to perform these actions?
 CDK for Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value:
```

type `yes` and hit the return/ enter key. Alternatively, if you don't want the manual accept process you can run the following command:

```bash
yarn destroy --auto-approve
```

Then all the resources (which CDK for Terraform has state information for) should be removed.
