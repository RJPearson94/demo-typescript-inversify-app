locals {
  current_timestamp = timestamp()
}

data "azurerm_storage_account_sas" "sas" {
  connection_string = var.storage.primary_connection
  https_only        = true
  start             = local.current_timestamp
  expiry            = timeadd(local.current_timestamp, "1h")

  resource_types {
    object    = true
    container = false
    service   = false
  }

  services {
    blob  = true
    queue = false
    table = false
    file  = false
  }

  permissions {
    read    = true
    write   = false
    delete  = false
    list    = false
    add     = false
    create  = false
    update  = false
    process = false
  }
}
