terraform {
  source = "../../modules/function//inversify"
}

dependency "bucket" {
  config_path = "../bucket"

  mock_outputs = {
    inversify_bucket = {
      name = "test_bucket"
    }
  }

  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
}

include {
  path = find_in_parent_folders()
}

inputs = {
  bucket = {
    name = dependency.bucket.outputs.inversify_bucket.name
  }

  artefact = {
    name   = "cloud-function.zip",
    source = "${get_terragrunt_dir()}/../../../../dist/cloud-function.zip"
  }
}
