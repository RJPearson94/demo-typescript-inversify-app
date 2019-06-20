provider "aws" {
  region                      = "us-east-1"
  s3_force_path_style         = true
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    cloudwatch     = "http://localhost:4582"
    cloudwatchlogs = "http://localhost:4586"
    iam            = "http://localhost:4593"
    lambda         = "http://localhost:4574"
    s3             = "http://localhost:4572"
    sts            = "http://localhost:4592"
  }
}