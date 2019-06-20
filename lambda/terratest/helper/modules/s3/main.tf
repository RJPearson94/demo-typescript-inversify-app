module "artefact_bucket" {
  source  = "appzen-oss/s3-buckets/aws"
  version = "0.3.2"
  name    = ["${var.name}"]
  stage   = "dev"
}