locals {
  function_name = "inversify_demo_function"
}

resource "aws_lambda_function" "inversify_demo_function" {
  s3_bucket         = data.aws_s3_bucket_object.lambda_zip.bucket
  s3_key            = data.aws_s3_bucket_object.lambda_zip.key
  s3_object_version = data.aws_s3_bucket_object.lambda_zip.version_id

  function_name = local.function_name
  role          = aws_iam_role.inversify_demo_iam.arn

  runtime     = "nodejs10.x"
  handler     = "main.handler"
  memory_size = 128
  timeout     = 30
  tags        = var.tags

  depends_on = [
    aws_iam_role_policy_attachment.lambda_logs,
    aws_cloudwatch_log_group.inversify_demo_log_group,
  ]
}

resource "aws_cloudwatch_log_group" "inversify_demo_log_group" {
  name              = "/aws/lambda/${local.function_name}"
  retention_in_days = var.log_retention
  tags              = var.tags
}

resource "aws_iam_role" "inversify_demo_iam" {
  name               = "inversify_demo_iam"
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

resource "aws_iam_policy" "inversify_demo_lambda_policy" {
  name = "inversify_demo_lambda_policy"
  path = "/"
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
    }
  ]
}
EOF

}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.inversify_demo_iam.name
  policy_arn = aws_iam_policy.inversify_demo_lambda_policy.arn
}
