terraform {
  source = "../"
}

include {
  path = "../../../åutility/terragrunt/terragrunt_args.hcl"
}

inputs = {
  tags = {
      Environment = "Testing"
  }
}