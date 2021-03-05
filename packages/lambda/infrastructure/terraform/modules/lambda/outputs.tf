output "lambda_function" {
  description = "Lambda function resource"
  value       = aws_lambda_function.lambda_function
}

output "lambda_alias" {
  description = "Lambda alias resource"
  value       = aws_lambda_alias.lambda_alias
}
