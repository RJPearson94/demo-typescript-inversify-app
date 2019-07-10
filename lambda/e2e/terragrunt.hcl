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
  bucket_name = "inversify-demo"
  zip_key     = "inversify-demo-lambda.zip"
  tags        = {
      Environment = "AWS"
  }
}