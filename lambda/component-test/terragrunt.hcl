terraform {
  source = "../"
}

include {
  path = "../../utility/terragrunt/terragrunt_args.hcl"
}

inputs = {
  bucket_name = "inversify-demo"
  zip_key     = "inversify-demo-lambda.zip"
  tags        = {
      Environment = "Testing"
  }
}