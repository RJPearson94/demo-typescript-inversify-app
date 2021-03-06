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
    name   = "azure-function.zip",
    source = "${get_parent_terragrunt_dir()}/../../../dist/azure-function.zip"
  }

  tags = {
    Environment = "Testing"
  }
}
