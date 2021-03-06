output "storage_container" {
  description = "Storage container details"
  value       = azurerm_storage_container.storage_container
}

output "blob_storage" {
  description = "Blob storage details"
  value       = azurerm_storage_blob.blob
}
