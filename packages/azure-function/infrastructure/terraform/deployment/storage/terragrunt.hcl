terraform {
  source = "../../modules/storage"
}

dependency "storage_account" {
  config_path = "../storage-account"

  mock_outputs = {
    storage_account = {
      name = "test"
    }
  }

  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
}


include {
  path = find_in_parent_folders()
}

inputs = {
  storage_account = dependency.storage_account.outputs.storage_account
}
