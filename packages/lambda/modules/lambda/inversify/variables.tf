variable "logs" {
  description = "Log details"
  type = object({
    retention = number
  })
}

variable "resource_suffix" {
  description = "Suffix for AWS resources to prevent name clashes between during testing"
  default     = ""
}

variable "tags" {
  description = "AWS tags to be applied to resources"
  type        = map(string)
  default     = {}
}

