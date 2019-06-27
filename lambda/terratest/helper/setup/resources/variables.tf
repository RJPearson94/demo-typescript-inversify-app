variable "bucket_name" {
  description = "Name of S3 Bucket"
}

variable "tags" {
  description = "Metadata tags to be attached to the bucket"
  type        = map(string)
}

variable "zip_key" {
  description = "artefact name"
}

variable "artefact_path" {
  description = "Path to artefact"
}
