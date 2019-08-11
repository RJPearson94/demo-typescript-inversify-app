variable "lambda_arn" {
  description = "ARN for API Gateway invoking a lambda function"
}

variable "lambda_excution_uri" {
  description = "URI/ ARN for API Gateway invoking a lambda function"
}

variable "tags" {
  description = "AWS tags to be applied to resources"
  type        = map(string)
}