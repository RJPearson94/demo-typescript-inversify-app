variable "log_retention" {
  description = "Max duration to retain cloudwatch logs"
}

variable "resource_suffix" {
  description = "Suffix for AWS resources to prevent name clashes between during testing"
}

variable "tags" {
  description = "AWS tags to be applied to resources"
  type        = map(string)
}

