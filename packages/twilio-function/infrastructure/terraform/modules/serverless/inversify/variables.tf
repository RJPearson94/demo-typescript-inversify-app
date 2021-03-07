variable "artefact" {
  description = "The function artefact details"
  type = object({
    source = string
  })
}

variable "resource_suffix" {
  description = "Suffix for Twilio resources to prevent name clashes between during testing"
  default     = ""
}
