package root_module_itest

import (
	"github.com/stretchr/testify/assert"
	"terratest_utility/terraform"
	"testing"
)

func TestRootModule(test *testing.T) {
	test.Parallel()

	// Before
	service := "."
	defer terraform.Destroy(test, service)
	terraform.Apply(test, service)

	test.Run("Should verify terraform outputs", func(test *testing.T) {
		// Given

		// When
		terraformOutputs := terraform.OutputAll(test, service)

		// Then
		assert.NotEmpty(test, terraformOutputs)
		assert.Regexp(test, "https://(.+).execute-api.(.+).amazonaws.com/dev", terraformOutputs["invoke_url"])
	})

}
