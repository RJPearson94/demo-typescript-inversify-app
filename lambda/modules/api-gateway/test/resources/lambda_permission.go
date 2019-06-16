package resources

import 	"github.com/zclconf/go-cty/cty"

type LambdaPermission struct {
	Action 				string		`cty:"action"`
	EventSourceToken	cty.Value	`cty:"event_source_token"`
	FunctionName		string  	`cty:"function_name"`
	ID					cty.Value	`cty:"id"`
	Principle			string		`cty:"principal"`
	Qualifier			cty.Value	`cty:"qualifier"`
	SourceAccount		cty.Value	`cty:"source_account"`
	SourceARN			cty.Value	`cty:"source_arn"`
	StatementID			string		`cty:"statement_id"`
	StatementIDPrefix	cty.Value	`cty:"statement_id_prefix"`
}