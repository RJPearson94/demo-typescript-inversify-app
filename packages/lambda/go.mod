module lambda_service

go 1.14

require (
	github.com/stretchr/testify v1.5.1
	github.com/zclconf/go-cty v1.7.1
	terratest_utility v0.0.0
)

replace terratest_utility v0.0.0 => ../../utility/terratest
