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
      # Cloud functions currently have to run in US-Central1
      GOOGLE_REGION = "us-central1"
    }
  }
}

inputs = {
  resource_suffix = ""
  tags = {
    environment = "testing"
  }
}
