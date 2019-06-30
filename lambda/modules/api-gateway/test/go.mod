module api-gateway-module-test

go 1.12

require (
	github.com/stretchr/testify v1.3.0
	github.com/zclconf/go-cty v1.0.0
	terratest-helper v0.0.0
)

replace terratest-helper v0.0.0 => ../../../terratest/helper
