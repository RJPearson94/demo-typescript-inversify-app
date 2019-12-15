variable "artefact" {
  description = "Artefact details"
  type        = object({ bucket = string, name = string, local_source = string })
}

variable "function" {
  description = "Function details"
  type        = object({ description = string, name = string, entry = string, runtime = string, memory = number, timeout = number })
}

variable "resource_suffix" {
  description = "Suffix for GCP resources to prevent name clashes between during testing"
}


variable "tags" {
  description = "GCP tags to be applied to resources"
  type        = map(string)
}
