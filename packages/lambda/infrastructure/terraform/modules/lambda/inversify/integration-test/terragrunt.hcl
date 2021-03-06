terraform {
  source = "../..///inversify"
}

include {
  path = "../../../../../../../../utility/terragrunt/terragrunt_args.hcl"
}

inputs = {
  logs = {
    retention = 14
  }
  artefact = {
    source = "${get_terragrunt_dir()}/../../../../../../dist/lambda.zip"
  }
  tags = {
    Environment = "Testing"
  }
}
