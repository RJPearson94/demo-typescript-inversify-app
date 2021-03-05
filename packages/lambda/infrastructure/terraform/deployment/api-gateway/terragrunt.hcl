terraform {
  source = "../../modules/api-gateway//inversify"
}

dependency "lambda" {
  config_path = "../lambda"

  mock_outputs = {
    inversify_lambda_alias = {
      arn        = "arn:aws:lambda:us-east-1:000000000000:function:example_lambda:stable"
      invoke_arn = "arn:aws:apigateway:us-east-1:lambda:path/2015–03–31/functions/arn:aws:lambda:us-east-1:0000000000:function:example_lambda:stable/invocations"
    }
  }

  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
}

include {
  path = find_in_parent_folders()
}

inputs = {
  lambda = {
    arn          = dependency.lambda.outputs.inversify_lambda_alias.arn
    excution_uri = dependency.lambda.outputs.inversify_lambda_alias.invoke_arn
  }
}
