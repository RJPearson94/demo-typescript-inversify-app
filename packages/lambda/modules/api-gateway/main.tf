resource "aws_api_gateway_rest_api" "greeting_rest_api" {
  name        = var.name
  description = var.description
  body        = var.openapi
  tags        = var.tags
}

resource "aws_api_gateway_deployment" "greeting_deployment" {
  description = var.deployment.description
  rest_api_id = aws_api_gateway_rest_api.greeting_rest_api.id
}

resource "aws_api_gateway_stage" "greeting_stage" {
  description   = var.stage.description
  stage_name    = var.stage.name
  rest_api_id   = aws_api_gateway_rest_api.greeting_rest_api.id
  deployment_id = aws_api_gateway_deployment.greeting_deployment.id
  tags          = var.tags
}

resource "aws_lambda_permission" "api_gateway_lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.greeting_rest_api.execution_arn}/*/*"
}
