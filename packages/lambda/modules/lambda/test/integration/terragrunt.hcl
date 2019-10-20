terraform {
  source = "../../"
}

include {
  path = "../../../../../../utility/terragrunt/terragrunt_args.hcl"
}

inputs = {
  log_retention = 14
  tags          = {
      Environment = "Testing"
  }
}