variable "resource_suffix" {
  description = "Suffix for GCP resources to prevent name clashes between during testing"
  default     = ""
}

variable "location" {
  description = "Location provision bucket"
  default     = "EU"
}

variable "force_destroy" {
  description = "Force destruction of bucket and objects"
  default     = false
}

variable "tags" {
  description = "GCP tags to be applied to resources"
  type        = map(string)
  default     = {}
}
