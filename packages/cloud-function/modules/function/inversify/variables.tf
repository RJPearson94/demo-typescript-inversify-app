variable "resource_suffix" {
  description = "Suffix for GCP resources to prevent name clashes between during testing"
  default     = ""
}

variable "bucket" {
  description = "Artefact bucket"
  type        = object({ name = string })
}

variable "tags" {
  description = "GCP tags to be applied to resources"
  type        = map(string)
  default     = {}
}
