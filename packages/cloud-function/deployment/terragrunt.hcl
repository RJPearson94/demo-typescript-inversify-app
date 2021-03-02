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
      GOOGLE_REGION = "europe-west2"
    }
  }
}

inputs = {
  resource_suffix = ""
  tags = {
    environment = "testing"
  }
}
