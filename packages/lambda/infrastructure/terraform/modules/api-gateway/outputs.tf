output "invoke_url" {
  description = "The URL to invoke an API stage"
  value       = aws_api_gateway_stage.greeting_stage.invoke_url
}

output "api_key_arn" {
  description = "The ARN of the API Key"
  value       = aws_api_gateway_api_key.greeting_api_key.arn
}

output "api_key_id" {
  description = "The ID of the API Key"
  value       = aws_api_gateway_api_key.greeting_api_key.id
}
