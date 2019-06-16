locals {
  name        = "TypeScript Inversify Lambda App"
  description = "Example Typescript Inversify Lambda App"
  version     = "1.0.0"
  stage       = "dev"
}

resource "aws_api_gateway_rest_api" "greeting_rest_api" {
  name        = local.name
  description = local.description
  body        = templatefile("${path.module}/template/openapi.tpl", {
    title               = local.name
    description         = local.description
    version             = local.version
    lambda_excution_uri = var.lambda_excution_uri
  })
}

resource "aws_api_gateway_deployment" "greeting_deployment" {
  description       = "Deployment of API Gateway to invoke inversify lambda function"
  stage_description = "To allow testing of solution"
  
  rest_api_id = aws_api_gateway_rest_api.greeting_rest_api.id
  stage_name  = local.stage
}

resource "aws_api_gateway_stage" "greeting_stage" {
  description   = "Deployment of API Gateway stage"
  rest_api_id   = aws_api_gateway_rest_api.greeting_rest_api.id
  deployment_id = aws_api_gateway_deployment.greeting_deployment.id
  stage_name    = local.stage
  tags          = var.tags
}

resource "aws_lambda_permission" "api_gateway_lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_deployment.greeting_deployment.execution_arn}/*/*"
}