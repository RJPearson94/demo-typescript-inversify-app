terraform {
  source = "../../modules/lambda//inversify"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  logs = {
    retention = 14
  }
}
