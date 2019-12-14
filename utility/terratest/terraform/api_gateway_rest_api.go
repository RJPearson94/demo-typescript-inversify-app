package terraform

import "github.com/zclconf/go-cty/cty"

type APIGatewayRestAPI struct {
	ARN                    cty.Value         `cty:"arn"`
	APIKeySource           string            `cty:"api_key_source"`
	BinaryMediaTypes       cty.Value         `cty:"binary_media_types"`
	Body                   string            `cty:"body"`
	CreatedDate            cty.Value         `cty:"created_date"`
	Description            string            `cty:"description"`
	EndpointConfiguration  cty.Value         `cty:"endpoint_configuration"`
	ExecutionARN           cty.Value         `cty:"execution_arn"`
	ID                     cty.Value         `cty:"id"`
	MinimumCompressionSize int               `cty:"minimum_compression_size"`
	Name                   string            `cty:"name"`
	Policy                 cty.Value         `cty:"policy"`
	RootResourceID         cty.Value         `cty:"root_resource_id"`
	Tags                   map[string]string `cty:"tags"`
}
