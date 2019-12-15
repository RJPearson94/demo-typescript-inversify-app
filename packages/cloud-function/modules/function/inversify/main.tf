locals {
  name = "inversify-demo-cloud-function.zip"
}

module "inversify_function" {
  source = "../"

  artefact = {
    name         = local.name
    local_source = "${path.module}/dist/${local.name}"
    bucket       = var.bucket.name
  }

  function = {
    name        = "inversify_demo_function"
    description = "Example Typescript Inversify Cloud Function"
    entry       = "handler"
    runtime     = "nodejs10"
    memory      = 128
    timeout     = 5
  }

  resource_suffix = var.resource_suffix
  tags            = var.tags
}
