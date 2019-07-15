terraform {
  source = "../"
}

include {
  path = "../../utility/terragrunt/terragrunt_args.hcl"
}

inputs = {
  tags = {
      Environment = "Testing"
  }
}