terraform {
  source = "../"

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
  bucket_name = "dev-inversify-demo"
  zip_key     = "inversify-demo-lambda.zip"
  log_retention = 14
  tags        = {
      Environment = "Localstack"
  }
}