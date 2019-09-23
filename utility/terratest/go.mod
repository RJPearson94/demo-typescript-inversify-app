module terratest_utility

go 1.12

require (
	github.com/aws/aws-sdk-go v1.24.3
	github.com/gruntwork-io/terratest v0.19.0
	github.com/hashicorp/go-uuid v1.0.1
	github.com/hashicorp/terraform v0.12.8
	github.com/stretchr/testify v1.4.0
	github.com/zclconf/go-cty v1.1.0
)

replace git.apache.org/thrift.git => github.com/apache/thrift v0.0.0-20180902110319-2566ecd5d999
