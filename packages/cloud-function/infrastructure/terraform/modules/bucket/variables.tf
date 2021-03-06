variable "resource_suffix" {
  description = "Suffix for GCP resources to prevent name clashes between during testing"
}

variable "name" {
  description = "Bucket name"
}

variable "storage_class" {
  description = "Storage class"
}

variable "location" {
  description = "Location provision bucket"
}

variable "force_destroy" {
  description = "Force destruction of bucket and objects"
  type        = bool
}

variable "versioning" {
  description = "Is versioning enabled on the bucket"
  type        = bool
}

variable "tags" {
  description = "GCP tags to be applied to resources"
  type        = map(string)
}
