terraform {
  source = "../../../terratest/helper/modules/s3"

  extra_arguments "init_args" {
    commands = [
      "init"
    ]

    arguments = [
      "-upgrade=true",
    ]
  }
}

inputs = {
  name = "inversify-demo"
}