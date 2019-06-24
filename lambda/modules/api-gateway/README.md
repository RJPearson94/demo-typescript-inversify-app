# API Gateway Terraform Module

This API Gateway module will provision an API Gateway to invoke a lambda function.

**NOTE:** This module requries Terraform 0.12

## Terraform Docs

### Inputs

| Name | Description | Type | Default | Required |
|------|-------------|:----:|:-----:|:-----:|
| lambda\_arn | ARN for API Gateway invoking a lambda function | string | n/a | yes |
| lambda\_excution\_uri | URI/ ARN for API Gateway invoking a lambda function | string | n/a | yes |
| tags | AWS tags to be applied to resources | map | n/a | yes |
