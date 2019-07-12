package helper

import (
	"github.com/hashicorp/terraform/plans"
	"github.com/zclconf/go-cty/cty/gocty"
	"testing"
)

func GetResource(test *testing.T, plan *plans.Plan, path string, impliedType interface{}) *plans.Change {
	for _, mod := range plan.Changes.Resources {
		if mod.Addr.String() == path {
			goCtyType, err := gocty.ImpliedType(impliedType)
			if err != nil {
				test.Fatal(err)
			}
			decodedChange, err := mod.ChangeSrc.Decode(goCtyType)
			if err != nil {
				test.Fatal(err)
			}
			return decodedChange
		}
	}
	return nil
}

func GetResourceInstanceChange(plan *plans.Plan, path string) *plans.ResourceInstanceChangeSrc {
	for _, mod := range plan.Changes.Resources {
		if mod.Addr.String() == path {
			return mod
		}
	}
	return nil
}
