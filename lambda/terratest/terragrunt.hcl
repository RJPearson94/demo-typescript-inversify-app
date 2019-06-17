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
  bucket_name = "inversify-demo"
  zip_key     = "inversify-demo-lambda.zip"
  tags        = {
      Environment = "Localstack"
  }
}