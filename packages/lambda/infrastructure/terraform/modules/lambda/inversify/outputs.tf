output "inversify_lambda_function" {
  description = "Inversify Lambda function resource"
  value       = module.inversify_function.lambda_function
}

output "inversify_lambda_alias" {
  description = "Inversify Lambda alias resource"
  value       = module.inversify_function.lambda_alias
}
