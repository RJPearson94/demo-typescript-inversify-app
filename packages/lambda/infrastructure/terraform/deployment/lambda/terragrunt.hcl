terraform {
  source = "../../modules/lambda//inversify"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  logs = {
    retention = 14
  }

  artefact = {
    source = "${get_terragrunt_dir()}/../../../../dist/lambda.zip"
  }
}
