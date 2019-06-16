package resources

import 	"github.com/zclconf/go-cty/cty"

type CloudwatchLogGroup struct {
    ARN 		cty.Value			`cty:"arn"`
	ID 			cty.Value  			`cty:"id"`
	Name  		string   			`cty:"name"`
	NamePrefix 	cty.Value			`cty:"name_prefix"`
	Retention  	int   				`cty:"retention_in_days"`
	KMSKeyID 	cty.Value 			`cty:"kms_key_id"`
	Tags  		map[string]string	`cty:"tags"`
}