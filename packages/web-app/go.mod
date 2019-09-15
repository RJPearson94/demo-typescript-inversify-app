module web-app

go 1.12

require terratest_utility v0.0.0

replace (
	git.apache.org/thrift.git => github.com/apache/thrift v0.0.0-20180902110319-2566ecd5d999
	terratest_utility v0.0.0 => ../../utility/terratest
)
