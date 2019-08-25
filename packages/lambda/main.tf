module "inversify_api_gateway" {
  source = "./modules/api-gateway"

  lambda_arn          = module.inversify_lambda.inversify_lambda_function.arn
  lambda_excution_uri = module.inversify_lambda.inversify_lambda_function.invoke_arn
  resource_suffix = var.resource_suffix
  tags                = var.tags
}

module "inversify_lambda" {
  source = "./modules/lambda"

  log_retention = var.log_retention
  resource_suffix = var.resource_suffix
  tags          = var.tags
}