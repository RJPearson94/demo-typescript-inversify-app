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
  description          = var.stage.description
  stage_name           = var.stage.name
  rest_api_id          = aws_api_gateway_rest_api.greeting_rest_api.id
  deployment_id        = aws_api_gateway_deployment.greeting_deployment.id
  xray_tracing_enabled = true
  tags                 = var.tags
}

resource "aws_api_gateway_api_key" "greeting_api_key" {
  name = "${var.name}-api-key"
  tags = var.tags
}

resource "aws_api_gateway_usage_plan" "greeting_usage_plan" {
  name = "${var.name}-usage-plan"

  api_stages {
    api_id = aws_api_gateway_rest_api.greeting_rest_api.id
    stage  = aws_api_gateway_stage.greeting_stage.stage_name
  }

  quota_settings {
    limit  = var.api_quota.limit
    period = var.api_quota.period
  }
}

resource "aws_api_gateway_usage_plan_key" "greeting_usage_plan_key" {
  key_id        = aws_api_gateway_api_key.greeting_api_key.id
  usage_plan_id = aws_api_gateway_usage_plan.greeting_usage_plan.id
  key_type      = "API_KEY"
}

resource "aws_lambda_permission" "api_gateway_lambda" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.greeting_rest_api.execution_arn}/*/*"
}
