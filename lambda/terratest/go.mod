module main-module-test

go 1.12

require (
	github.com/gruntwork-io/terratest v0.17.0
	github.com/hashicorp/terraform v0.12.2
	github.com/stretchr/testify v1.3.0
	github.com/zclconf/go-cty v0.0.0-20190516203816-4fecf87372ec
	terratest-helper v0.0.0
)

replace terratest-helper v0.0.0 => ./helper