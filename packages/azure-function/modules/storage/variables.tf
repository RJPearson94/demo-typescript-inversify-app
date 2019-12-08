variable "name" {
  description = "Name of storage container"
}

variable "artefact" {
  description = "Artefact details"
  type        = object({ name = string, source = string })
}

variable "storage_account" {
  description = "Storage account details"
  type        = object({ name = string })
}

variable "tags" {
  description = "Azure tags to be applied to resources"
  type        = map(string)
}
