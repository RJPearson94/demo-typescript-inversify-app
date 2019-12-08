terraform {
  source = "../../modules/storage-account"
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
}
