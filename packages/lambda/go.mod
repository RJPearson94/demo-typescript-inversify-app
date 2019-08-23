module lambda_service

go 1.12

require (
	github.com/aws/aws-sdk-go v1.23.7
	github.com/stretchr/testify v1.4.0
	github.com/zclconf/go-cty v1.1.0
	terratest_utility v0.0.0
)

replace terratest_utility v0.0.0 => ../../utility/terratest
