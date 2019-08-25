variable "log_retention" {
  description = "Max duration to retain cloudwatch logs"
  default     = "14"
}

variable "resource_suffix" {
  description = "Suffix for AWS resources to prevent name clashes between during testing"
  default = ""
}

variable "tags" {
  description = "AWS tags to be applied to resources"
  type        = map(string)
}