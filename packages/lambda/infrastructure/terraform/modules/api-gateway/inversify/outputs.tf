output "invoke_url" {
  description = "The URL to invoke an API stage"
  value       = module.inversify_api_gateway.invoke_url
}

output "api_key_arn" {
  description = "The ARN of the API Key"
  value       = module.inversify_api_gateway.api_key_arn
}

output "api_key_id" {
  description = "The ID of the API Key"
  value       = module.inversify_api_gateway.api_key_id
}
