module "artefact_bucket" {
  source                   = "git::https://github.com/cloudposse/terraform-aws-s3-bucket.git?ref=0.3.0"
  name                     = "${var.name}"
  stage                    = "dev"
  namespace                = "cp"
}