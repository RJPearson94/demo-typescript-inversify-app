# Lambda Terraform Module

This lambda module will provision and configure a lambda function.

**NOTE:** This module requries Terraform 0.12

## Terraform Docs

### Inputs

| Name          | Description                               |  Type  | Default | Required |
| ------------- | ----------------------------------------- | :----: | :-----: | :------: |
| bucket_name   | Name of Bucket where artefacts are stored | string |   n/a   |   yes    |
| log_retention | Max duration to retain cloudwatch logs    | string |   n/a   |   yes    |
| tags          | AWS tags to be applied to resources       |  map   |   n/a   |   yes    |
| zip_key       | ZIP file name                             | string |   n/a   |   yes    |

### Outputs

| Name                      | Description                        |
| ------------------------- | ---------------------------------- |
| inversify_lambda_function | Inversify Lambda function resource |