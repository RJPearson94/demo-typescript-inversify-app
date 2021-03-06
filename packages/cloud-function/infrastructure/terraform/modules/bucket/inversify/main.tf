module "inversify_bucket" {
  source = "../"

  name          = "inversify"
  storage_class = "STANDARD"
  versioning    = true

  resource_suffix = var.resource_suffix
  location        = var.location
  force_destroy   = var.force_destroy
  tags            = var.tags
}
