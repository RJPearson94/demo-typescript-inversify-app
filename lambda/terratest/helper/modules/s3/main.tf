module "artefact_bucket" {
  source        = "appzen-oss/s3-buckets/aws"
  version       = "0.3.2"
  names         = ["${var.name}"]
  environment   = "dev"
}