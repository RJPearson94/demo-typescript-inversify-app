
resource "twilio_serverless_service" "service" {
  unique_name         = "${var.service.unique_name}${var.resource_suffix}"
  friendly_name       = "${var.service.friendly_name}${var.resource_suffix}"
  include_credentials = var.service.include_credentials
  ui_editable         = var.service.ui_editable
}

resource "twilio_serverless_function" "function" {
  service_sid   = twilio_serverless_service.service.sid
  friendly_name = "${var.function.friendly_name}${var.resource_suffix}"
  source        = var.function.artefact.source
  source_hash   = filemd5(var.function.artefact.source)
  content_type  = "application/javascript"
  path          = var.function.path
  visibility    = var.function.visibility
}

resource "twilio_serverless_build" "build" {
  service_sid = twilio_serverless_service.service.sid

  function_version {
    sid = twilio_serverless_function.function.latest_version_sid
  }

  runtime = var.build.runtime

  dependencies = merge({
    "twilio"                  = "3.57.0"
    "fs"                      = "0.0.1-security"
    "lodash"                  = "4.17.21"
    "util"                    = "0.12.3"
    "xmldom"                  = "0.4.0"
    "@twilio/runtime-handler" = "1.0.1"
  }, var.build.dependencies)

  polling {
    enabled      = true
    max_attempts = var.build.polling.max_attempts
    delay_in_ms  = var.build.polling.delay_in_ms
  }
}

resource "twilio_serverless_environment" "environment" {
  service_sid   = twilio_serverless_service.service.sid
  unique_name   = "${var.environment.unique_name}${var.resource_suffix}"
  domain_suffix = var.environment.domain_suffix
}

resource "twilio_serverless_deployment" "deployment" {
  service_sid     = twilio_serverless_service.service.sid
  environment_sid = twilio_serverless_environment.environment.sid
  build_sid       = twilio_serverless_build.build.sid
}
