terraform {
  source = "../"

  extra_arguments "init_args" {
    commands = [
      "init"
    ]

    arguments = [
      "-upgrade=true",
    ]
  }

    extra_arguments "set_region" {
    commands = [
      "apply",
      "plan",
      "destroy",
      "import",
      "push",
      "refresh"
    ]

    env_vars = {
        AWS_REGION = "eu-west-1"
    }
  }
}

inputs = {
  lambda_arn          = "arn:aws:lambda:us-east-1:000000000000:function:example_lambda_arn"
  lambda_excution_uri = "arn:aws:apigateway:us-east-1:lambda:path/2015–03–31/functions/arn:aws:lambda:us-east-1:0000000000:function:example_lambda/invocations"
  tags                = {
      Environment = "Localstack"
  }
}