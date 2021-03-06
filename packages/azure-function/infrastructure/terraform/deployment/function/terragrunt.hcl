terraform {
  source = "../../modules/function"
}

dependency "storage" {
  config_path = "../storage"

  mock_outputs = {
    blob_storage = {
      url = "http://localhost/azure-function.zip"
    }
  }

  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
}

dependency "storage_account" {
  config_path = "../storage-account"

  mock_outputs = {
    storage_account = {
      name = "test"
      primary_access_key = "Test"
      primary_connection_string = "DefaultEndpointsProtocol=https"
    }
  }

  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
}

dependency "resource_group" {
  config_path = "../resource-group"

  mock_outputs = {
    resource_group = {
      name     = "test"
      location = "test"
    }
  }

  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
}

include {
  path = find_in_parent_folders()
}

inputs = {
  resource_group = dependency.resource_group.outputs.resource_group
  storage = {
    url = dependency.storage.outputs.blob_storage.url
    primary_connection = dependency.storage_account.outputs.storage_account.primary_connection_string
  }
  storage_account = {
    name       = dependency.storage_account.outputs.storage_account.name
    access_key = dependency.storage_account.outputs.storage_account.primary_access_key
  }
}
