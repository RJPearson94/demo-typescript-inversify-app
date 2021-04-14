# @rjpearson94/twilio-function-cdktf-infrastructure

This package is responsible for deploying the function to Twilio using [CDK for Terraform](https://github.com/hashicorp/terraform-cdk)

## Getting Started

To be able to test and run the function on real Twilio infrastructure you need the following:

- [Twilio Account](https://www.twilio.com/)
- [Terraform](https://www.terraform.io/) (v0.14 or above)
- [Yarn 2/ Berry](https://yarnpkg.com/)

## Commands

- synth (Generate Terraform JSON template)
- get (Download and generate the necessary constructs)
- test (Run all tests)

For the full commands list please see the [package.json](./package.json)

The commands can be run using the following

Open a command prompt in this directory and run

```sh
yarn <script>
```

Before the Twilio function resources can be managed via Terraform (creation, updating, destruction), the Twilio function javascript file must be built and stored in the dist folder of the twilio-function package. If the javascript file has not been built you will need to follow the instructions in the Twilio function [README](../../README.md)

Additionally, the Twilio provider constructs need to be autogenerated before the resources can be managed or the tests can run. To generate the CDKTF constructs please run the following command

```sh
yarn get
```

## Deploying to Twilio

To see what resources will be provisioned, change into the deployment folder and run the following:

```bash
yarn synth
```

This will show you all the resources that will be provisioned, including:

- [Functions](https://www.twilio.com/docs/runtime/functions)

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

## Remove Resources from Twilio

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