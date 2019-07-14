package terraform

import "github.com/zclconf/go-cty/cty"

type IAMRolePolicyAttachment struct {
	ID        cty.Value `cty:"id"`
	PolicyARN cty.Value `cty:"policy_arn"`
	Role      string    `cty:"role"`
}
