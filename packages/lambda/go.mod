module lambda_service

go 1.12

require (
	github.com/stretchr/testify v1.4.0
	terratest_utility v0.0.0
)

replace (
	git.apache.org/thrift.git => github.com/apache/thrift v0.0.0-20180902110319-2566ecd5d999
	terratest_utility v0.0.0 => ../../utility/terratest
)
