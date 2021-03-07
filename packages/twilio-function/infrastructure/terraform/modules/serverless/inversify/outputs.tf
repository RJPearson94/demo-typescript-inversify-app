output "function_url" {
  description = "The url of the deployed function"
  value       = "https://${module.inversify_serverless.environment.domain_name}${module.inversify_serverless.function.path}"
}
