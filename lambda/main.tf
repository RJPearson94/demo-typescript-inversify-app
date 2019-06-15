
module "inversify_lambda" {
  source = "modules/lambda"
  
  log_retention = var.log_retention
  bucket_name = var.bucket_name
  zip_key = var.zip_key
  tags = var.tags
}