resource "azurerm_app_service_plan" "service_plan" {
  name                = "${var.name}-service-plan"
  location            = var.region
  resource_group_name = var.resource_group.name
  kind                = "FunctionApp"

  sku {
    tier = var.app_plan.tier
    size = var.app_plan.size
  }
}

resource "azurerm_function_app" "inversify_demo_function" {
  name                       = var.name
  location                   = var.region
  resource_group_name        = var.resource_group.name
  app_service_plan_id        = azurerm_app_service_plan.service_plan.id
  storage_account_name       = var.storage_account.name
  storage_account_access_key = var.storage_account.access_key
  version                    = "~3"

  app_settings = {
    FUNCTIONS_WORKER_RUNTIME     = "node"
    WEBSITE_NODE_DEFAULT_VERSION = "~14"
    HASH                         = filebase64sha256(var.artefact.source)
    FUNCTION_APP_EDIT_MODE       = "readonly"
    WEBSITE_RUN_FROM_PACKAGE     = "${var.storage.url}${data.azurerm_storage_account_sas.sas.sas}"
  }

  https_only = true
  tags       = var.tags
}
