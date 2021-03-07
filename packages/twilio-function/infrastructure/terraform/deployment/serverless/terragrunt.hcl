terraform {
  source = "../../modules/serverless//inversify"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  artefact = {
    source = "${get_terragrunt_dir()}/../../../../dist/index.js"
  }
}

