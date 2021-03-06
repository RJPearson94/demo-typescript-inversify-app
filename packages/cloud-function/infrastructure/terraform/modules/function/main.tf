locals {
  resource_suffix = var.resource_suffix == "" ? "" : "_${var.resource_suffix}"
}

resource "google_storage_bucket_object" "artefact_zip" {
  name   = "${var.artefact.name}${local.resource_suffix}"
  bucket = var.artefact.bucket
  source = var.artefact.local_source
}

resource "google_cloudfunctions_function" "function" {
  name        = "${var.function.name}${local.resource_suffix}"
  description = var.function.description
  runtime     = var.function.runtime
  timeout     = var.function.timeout

  available_memory_mb   = var.function.memory
  source_archive_bucket = google_storage_bucket_object.artefact_zip.bucket
  source_archive_object = google_storage_bucket_object.artefact_zip.name
  trigger_http          = true
  entry_point           = var.function.entry

  labels = var.tags
}

resource "google_cloudfunctions_function_iam_member" "invoker" {
  project        = google_cloudfunctions_function.function.project
  region         = google_cloudfunctions_function.function.region
  cloud_function = google_cloudfunctions_function.function.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}
