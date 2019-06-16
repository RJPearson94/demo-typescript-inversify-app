package resources

import 	"github.com/zclconf/go-cty/cty"

type IAMPolicy struct {
	ARN 		cty.Value	`cty:"arn"`
	Description	string		`cty:"description"`
	ID 			cty.Value  	`cty:"id"`
	Name  		string   	`cty:"name"`
	NamePrefix 	cty.Value   `cty:"name_prefix"`
	Path 		string		`cty:"path"`
	Policy 		string		`cty:"policy"`
}