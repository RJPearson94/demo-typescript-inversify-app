output "invoke_url" {
  description = "The URL to invoke an API stage"
  value = aws_api_gateway_stage.greeting_stage.invoke_url
}
