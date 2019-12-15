module "inversify_function" {
  source = "../"

  artefact = {
    source = "${path.module}/dist/inversify-demo-lambda.zip"
  }

  name        = "inversify_demo_function"
  description = "Example Typescript Inversify Lambda"
  runtime     = "nodejs10.x"
  handler     = "main.handler"
  memory_size = 512
  timeout     = 30

  logs = var.logs

  resource_suffix = var.resource_suffix
  tags            = var.tags
}
