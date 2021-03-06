variable "region" {
  description = "Region where resource should be deployed"
}

variable "storage" {
  description = "Storage details"
  type        = object({ url = string, primary_connection = string })
}

variable "storage_account" {
  description = "Storage account details"
  type        = object({ name = string, access_key = string })
}

variable "artefact" {
  description = "Artefact details"
  type        = object({ name = string, source = string })
}

variable "resource_group" {
  description = "Resource group details"
  type        = object({ name = string })
}

variable "app_plan" {
  description = "App plan details"
  type        = object({ tier = string, size = string })
  default = {
    tier = "Dynamic",
    size = "Y1"
  }
}

variable "name" {
  description = "Name of resources"
}

variable "tags" {
  description = "Azure tags to be applied to resources"
  type        = map(string)
}
