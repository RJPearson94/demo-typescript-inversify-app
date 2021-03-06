module "inversify_function" {
  source = "../"

  artefact = {
    name         = var.artefact.name
    local_source = var.artefact.source
    bucket       = var.bucket.name
  }

  function = {
    name        = "inversify_demo_function"
    description = "Example Typescript Inversify Cloud Function"
    entry       = "handler"
    runtime     = "nodejs14"
    memory      = 128
    timeout     = 5
  }

  resource_suffix = var.resource_suffix
  tags            = var.tags
}
