variable "log_retention" {
  description = "Max duration to retain cloudwatch logs"
  default     = "14"
}

variable "tags" {
  description = "AWS tags to be applied to resources"
  type        = map(string)
}