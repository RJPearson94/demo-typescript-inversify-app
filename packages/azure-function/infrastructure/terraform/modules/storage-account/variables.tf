variable "region" {
  description = "Region where storage account should be created"
}

variable "account" {
  description = "Account pricing and replication details"
  type        = object({ tier = string, replication_type = string })
  default = {
    tier             = "Standard"
    replication_type = "LRS"
  }
}

variable "resource_group" {
  description = "Resource group details"
  type        = object({ name = string, location = string })
}

variable "name" {
  description = "Name of storage account"
}

variable "tags" {
  description = "Azure tags to be applied to resources"
  type        = map(string)
}

