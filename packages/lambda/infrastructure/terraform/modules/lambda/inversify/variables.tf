variable "logs" {
  description = "Log details"
  type = object({
    retention = number
  })
}

variable "artefact" {
  description = "The lambda artefact/ zip details"
  type = object({
    source = string
  })
}


variable "resource_suffix" {
  description = "Suffix for AWS resources to prevent name clashes between during testing"
  default     = ""
}

variable "alias_name" {
  description = "The name of the function alias"
  default     = "stable"
}

variable "tags" {
  description = "AWS tags to be applied to resources"
  type        = map(string)
  default     = {}
}

