module "artefact_bucket" {
  source      = "devops-workflow/s3-buckets/aws"
  version     = "0.3.0"
  names       = ["${var.name}"]
  environment = "dev"
}