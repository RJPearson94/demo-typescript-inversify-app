package lambda_module_itest

import (
	"fmt"
	"github.com/stretchr/testify/assert"
	"terratest_utility/terraform"
	"terratest_utility/aws"
	"terratest_utility/helper"
	"encoding/json"
	"testing"
)

func TestLambdaModule(test *testing.T) {
	test.Parallel()

	resourceSuffix := helper.GenerateUUID(test)
	service := "."

	// Before
	defer terraform.Destroy(test, service, resourceSuffix)
	terraform.Apply(test, service, resourceSuffix)

	test.Run("Should verify terraform outputs", func(test *testing.T) {
		// Given

		// When
		terraformOutputs := terraform.OutputAll(test, service, resourceSuffix)

		// Then
		assert.NotEmpty(test, terraformOutputs)
		assert.NotNil(test, terraformOutputs["inversify_lambda_function"])
	})

	test.Run("Should invoke function and verify response", func(test *testing.T) {
		// Given
		client := aws.NewLambdaClient()

		// When
		functionName := fmt.Sprintf("inversify_demo_function_%s", resourceSuffix)
		lambdaResponse := aws.InvokeAndMarshallLambdaResponse(test, client, functionName)

		// Then
		assert.Equal(test, 200, lambdaResponse.StatusCode)
		lambdaResponseBody := validateAndUnmarshalLambdaResponseBody(test, lambdaResponse)
		assert.Equal(test, "HelloLambda", lambdaResponseBody.Message)
	})

}

func validateAndUnmarshalLambdaResponseBody(test *testing.T, lambdaResponse aws.LambdaResponse) LambdaResponseBody {
	lambdaBody := lambdaResponse.Body
	assert.NotNil(test, lambdaBody)

	var lambdaResponseBody LambdaResponseBody
	err := json.Unmarshal([]byte(lambdaBody), &lambdaResponseBody); if err != nil {
		test.Fatal(err)
	}
	return lambdaResponseBody
}
