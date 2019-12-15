locals {
  name        = "TypeScript Inversify Lambda App ${var.resource_suffix}"
  description = "Example Typescript Inversify Lambda App"
}

module "inversify_api_gateway" {
  source = "../"

  name        = local.name
  description = local.description
  openapi = templatefile("${path.module}/template/openapi.tpl.json", {
    title               = local.name
    description         = local.description
    version             = "1.0.0"
    lambda_excution_uri = var.lambda.excution_uri
  })

  deployment = {
    description = "Deployment of API Gateway to invoke inversify lambda function"
  }

  stage = {
    name        = "dev"
    description = "Deployment of API Gateway stage"
  }

  lambda = {
    arn = var.lambda.arn
  }

  resource_suffix = var.resource_suffix
  tags            = var.tags
}
