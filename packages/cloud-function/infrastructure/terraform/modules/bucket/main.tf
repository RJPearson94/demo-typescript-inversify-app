locals {
  resource_suffix = var.resource_suffix == "" ? "" : "_${var.resource_suffix}"
}

resource "google_storage_bucket" "bucket" {
  name          = "${var.name}${local.resource_suffix}"
  location      = var.location
  storage_class = var.storage_class
  force_destroy = var.force_destroy

  versioning {
    enabled = var.versioning
  }
}
