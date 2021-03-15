data "aws_kms_alias" "aws_managed_kms_lambda_key" {
  name = "alias/aws/lambda"
}
