terraform {
  extra_arguments "init_args" {
    commands = [
      "init"
    ]

    arguments = [
      "-upgrade=true",
    ]
  }
}

inputs = {
  name   = "inversify"
  region = "northeurope"

  artefact = {
    name = "azure-function.zip",
    # cd out of terragrunt cache folder
    source = "../../../../../azure-function.zip"
  }

  tags = {
    Environment = "Testing"
  }
}
