module lambda_terrafrom_service

go 1.14

require (
	github.com/gruntwork-io/terratest v0.32.8
	github.com/likexian/gokit v0.20.15 // indirect
	github.com/stretchr/testify v1.5.1
	github.com/zclconf/go-cty v1.7.1 // indirect
	terratest_utility v0.0.0
)

replace terratest_utility v0.0.0 => ../../../../utility/terratest
