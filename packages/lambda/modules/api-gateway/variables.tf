variable "name" {
  description = "Name of API Gateway"
}

variable "description" {
  description = "Description of API Gateway"
}

variable "openapi" {
  description = "OpenAPI schama"
  type        = any
}

variable "deployment" {
  description = "Deployment details"
  type = object({
    description = string
  })
}

variable "stage" {
  description = "Stage details"
  type = object({
    name        = string,
    description = string
  })
}


variable "lambda" {
  description = "Lambda details"
  type = object({
    arn = string
  })
}

variable "resource_suffix" {
  description = "Suffix for AWS resources to prevent name clashes between during testing"
}

variable "tags" {
  description = "AWS tags to be applied to resources"
  type        = map(string)
}
