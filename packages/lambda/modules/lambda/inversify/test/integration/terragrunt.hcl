terraform {
  source = "../../..//inversify"
}

include {
  path = "../../../../../../../utility/terragrunt/terragrunt_args.hcl"
}

inputs = {
  logs = {
    retention = 14
  }
  tags = {
    Environment = "Testing"
  }
}
