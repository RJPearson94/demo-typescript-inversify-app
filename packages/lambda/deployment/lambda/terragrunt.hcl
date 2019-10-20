terraform {
  source = "../../modules/lambda"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  log_retention = "14"
}