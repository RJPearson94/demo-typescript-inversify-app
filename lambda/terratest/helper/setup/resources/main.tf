resource "aws_s3_bucket" "artefact_bucket" {
  bucket = var.bucket_name
  acl    = "private"

  force_destroy = true

  versioning {
    enabled = false
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  tags = var.tags
}

resource "aws_s3_bucket_object" "upload_artefact" {
  bucket = aws_s3_bucket.artefact_bucket.bucket
  key    = var.zip_key
  source = var.artefact_path
  etag   = filemd5(var.artefact_path)
  tags   = var.tags
}