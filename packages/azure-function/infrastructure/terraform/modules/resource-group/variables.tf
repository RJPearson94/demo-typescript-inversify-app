variable "region" {
  description = "Region where resource group should be created"
}

variable "name" {
  description = "Name of resource group"
}

variable "tags" {
  description = "Azure tags to be applied to resources"
  type        = map(string)
}

