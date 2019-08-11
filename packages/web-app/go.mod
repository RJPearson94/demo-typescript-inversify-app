module web-app

go 1.12

require (
	github.com/gruntwork-io/terratest v0.18.3
	terratest-utility v0.0.0
)

replace terratest-utility v0.0.0 => ../../utility/terratest
