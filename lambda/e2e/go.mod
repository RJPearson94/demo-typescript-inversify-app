module main-module-e2e

go 1.12

require (
	github.com/stretchr/testify v1.3.0
	terratest-helper v0.0.0
)

replace terratest-helper v0.0.0 => ../terratest/helper
