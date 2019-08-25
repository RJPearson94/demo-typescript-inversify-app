variable "lambda_arn" {
  description = "ARN for API Gateway invoking a lambda function"
}

variable "lambda_excution_uri" {
  description = "URI/ ARN for API Gateway invoking a lambda function"
}

variable "resource_suffix" {
  description = "Suffix for AWS resources to prevent name clashes between during testing"
}

variable "tags" {
  description = "AWS tags to be applied to resources"
  type        = map(string)
}