terraform {
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
      "refresh",
      "validate"
    ]

    env_vars = {
      AWS_REGION = "eu-west-1"
    }
  }
}

inputs = {
  resource_suffix = ""
  tags = {
    Environment = "Testing"
    IaC         = "Terraform"
  }
}