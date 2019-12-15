terraform {
  source = "../../..//inversify"
}

include {
  path = "../../../../../../../utility/terragrunt/terragrunt_args.hcl"
}

inputs = {
  lambda = {
    arn          = "arn:aws:lambda:us-east-1:000000000000:function:example_lambda_arn"
    excution_uri = "arn:aws:apigateway:us-east-1:lambda:path/2015–03–31/functions/arn:aws:lambda:us-east-1:0000000000:function:example_lambda/invocations"
  }
  tags = {
    Environment = "Testing"
  }
}
