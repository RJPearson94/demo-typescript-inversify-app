variable "log_retention" {
  description = "Max duration to retain cloudwatch logs"
  default     = "14"
}

variable "bucket_name" {
  description = "Name of Bucket where artefacts are stored"
}

variable "zip_key" {
  description = "ZIP file name"
}

variable "tags" {
  description = "AWS tags to be applied to resources"
  type        = map(string)
}

