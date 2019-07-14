variable "log_retention" {
  description = "Max duration to retain cloudwatch logs"
}

variable "tags" {
  description = "AWS tags to be applied to resources"
  type        = map(string)
}

