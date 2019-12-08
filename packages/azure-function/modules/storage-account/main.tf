resource "azurerm_storage_account" "storage" {
  name                     = var.name
  resource_group_name      = var.resource_group.name
  location                 = var.resource_group.location
  account_tier             = var.account.tier
  account_replication_type = var.account.replication_type
  tags                     = var.tags
}
