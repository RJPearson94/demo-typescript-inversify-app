package resources

import "github.com/zclconf/go-cty/cty"

type APIGatewayDeployment struct {
	CreatedDate      cty.Value `cty:"created_date"`
	Description      string    `cty:"description"`
	ExecutionARN     cty.Value `cty:"execution_arn"`
	ID               cty.Value `cty:"id"`
	InvokeURL        cty.Value `cty:"invoke_url"`
	RestAPIID        cty.Value `cty:"rest_api_id"`
	StageDescription string    `cty:"stage_description"`
	StageName        string    `cty:"stage_name"`
	Variables        cty.Value `cty:"variables"`
}
