data "aws_s3_bucket_object" "lambda_zip" {
  bucket = var.bucket_name
  key    = var.zip_key
}