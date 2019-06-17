module "inversify_api_gateway" {
  source = "modules/api-gateway"

  lambda_arn          = inversify_lambda.inversify_lambda_function.arn
  lambda_excution_uri = inversify_lambda.inversify_lambda_function.invoke_arn
  tags                = var.tags
}

module "inversify_lambda" {
  source = "modules/lambda"

  log_retention = var.log_retention
  bucket_name   = var.bucket_name
  zip_key       = var.zip_key
  tags          = var.tags
}