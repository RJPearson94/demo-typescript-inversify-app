package resources

import 	"github.com/zclconf/go-cty/cty"

type IAMRole struct {
	ARN 				cty.Value			`cty:"arn"`
	AssumeRolePolicy	string				`cty:"assume_role_policy"`
	CreatedDate 		cty.Value  			`cty:"create_date"`
	Description			string				`cty:"description"`
	ForceDetachPolicies bool  				`cty:"force_detach_policies"`
	ID					cty.Value			`cty:"id"`
	MaxSessionDuration	int					`cty:"max_session_duration"`
	Name  				string   			`cty:"name"`
	NamePrefix			cty.Value			`cty:"name_prefix"`
	Path 				string				`cty:"path"`
	PermissionsBoundary	cty.Value			`cty:"permissions_boundary"`
	Tags  				map[string]string	`cty:"tags"`
	UniqueID			cty.Value			`cty:"unique_id"`
}