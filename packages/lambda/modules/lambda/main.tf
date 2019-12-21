locals {
  resource_suffix = var.resource_suffix == "" ? "" : "_${var.resource_suffix}"
  function_name   = "${var.name}${local.resource_suffix}"
  zip_file        = var.artefact.source
}

resource "aws_lambda_function" "lambda_function" {
  filename         = local.zip_file
  source_code_hash = filebase64sha256(local.zip_file)

  function_name = local.function_name
  role          = aws_iam_role.lambda_iam.arn
  description   = var.description

  runtime     = var.runtime
  handler     = var.handler
  memory_size = var.memory_size
  timeout     = var.timeout
  tags        = var.tags

  tracing_config {
    mode = "PassThrough"
  }

  depends_on = [
    aws_iam_role_policy_attachment.lambda_logs,
    aws_cloudwatch_log_group.lambda_log_group,
  ]
}

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/${local.function_name}"
  retention_in_days = var.logs.retention
  tags              = var.tags
}

resource "aws_iam_role" "lambda_iam" {
  name        = "lambda_iam${local.resource_suffix}"
  description = "Lambda IAM Role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
EOF

  tags = var.tags
}

resource "aws_iam_policy" "lambda_policy" {
  name        = "lambda_policy${local.resource_suffix}"
  path        = "/"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "xray:PutTraceSegments", 
        "xray:PutTelemetryRecords"
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
EOF

}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda_iam.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}
