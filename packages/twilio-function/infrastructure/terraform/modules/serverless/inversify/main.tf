module "inversify_serverless" {
  source = "../"

  resource_suffix = var.resource_suffix

  service = {
    unique_name         = "inversify"
    friendly_name       = "inversify"
    include_credentials = false
    ui_editable         = false
  }

  function = {
    artefact      = var.artefact
    friendly_name = "inversify"
    path          = "/inversify"
    visibility    = "public"
  }

  build = {
    runtime      = "node12"
    dependencies = {}
    polling = {
      max_attempts = null
      delay_in_ms  = null
    }
  }

  environment = {
    unique_name   = "inversify"
    domain_suffix = null
  }
}
