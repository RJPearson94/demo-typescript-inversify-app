variable "resource_suffix" {
  description = "Suffix for AWS resources to prevent name clashes between during testing"
  default     = ""
}

variable "lambda" {
  description = "Lambda details"
  type        = object({ arn = string, excution_uri = string })
}

variable "api_quota" {
  description = "API key quota details"
  type = object({
    limit  = number,
    period = string
  })
  default = {
    limit  = 100
    period = "MONTH"
  }
}

variable "tags" {
  description = "AWS tags to be applied to resources"
  type        = map(string)
  default     = {}
}
