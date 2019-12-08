resource "azurerm_storage_container" "storage_container" {
  name                  = var.name
  storage_account_name  = var.storage_account.name
  container_access_type = "private"
}

resource "azurerm_storage_blob" "blob" {
  name                   = var.artefact.name
  storage_account_name   = var.storage_account.name
  storage_container_name = azurerm_storage_container.storage_container.name
  type                   = "block"
  source                 = var.artefact.source

  metadata = {
    hash = filebase64sha256(var.artefact.source)
  }
}
