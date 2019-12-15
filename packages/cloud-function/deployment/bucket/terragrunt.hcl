terraform {
  source = "../../modules/bucket//inversify"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  force_destroy = true
}
