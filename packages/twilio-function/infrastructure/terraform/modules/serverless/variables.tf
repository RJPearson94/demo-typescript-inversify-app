variable "service" {
  description = "The serverless service details"
  type = object({
    unique_name         = string
    friendly_name       = string
    include_credentials = bool
    ui_editable         = bool
  })
}

variable "function" {
  description = "The serverless function details"
  type = object({
    artefact = object({
      source = string
    })
    friendly_name = string
    path          = string
    visibility    = string
  })
}

variable "build" {
  description = "The serverless build details"
  type = object({
    runtime      = string
    dependencies = map(string)
    polling = object({
      max_attempts = number
      delay_in_ms  = number
    })
  })
}

variable "environment" {
  description = "The serverless environment details"
  type = object({
    unique_name   = string
    domain_suffix = string
  })
}

variable "resource_suffix" {
  description = "Suffix for twilio resources to prevent name clashes between during testing"
}
