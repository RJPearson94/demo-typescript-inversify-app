variable "artefact" {
  description = "Artefact details"
  type = object({
    source = string
  })
}

variable "name" {
  description = "Name of lambda function"
}

variable "description" {
  description = "Decription of lambda function"
}

variable "runtime" {
  description = "Rutime of of lambda function"
}

variable "handler" {
  description = "Handler function of lambda function"
}

variable "memory_size" {
  description = "Max memory size the lambda function can use"
  type        = number
}

variable "timeout" {
  description = "Max execution time of lambda function"
  type        = number
}

variable "logs" {
  description = "Log details"
  type = object({
    retention = number
  })
}

variable "resource_suffix" {
  description = "Suffix for AWS resources to prevent name clashes between during testing"
}

variable "tags" {
  description = "AWS tags to be applied to resources"
  type        = map(string)
}
