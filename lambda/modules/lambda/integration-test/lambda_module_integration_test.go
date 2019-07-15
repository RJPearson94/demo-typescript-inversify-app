package lambda_module_itest

import (
	"github.com/stretchr/testify/assert"
	"terratest_utility/terraform"
	"terratest_utility/aws"
	"encoding/json"
	"testing"
)

func TestLambdaModule(test *testing.T) {
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
		assert.NotNil(test, terraformOutputs["inversify_lambda_function"])
	})

	test.Run("Should invoke function and verify response", func(test *testing.T) {
		// Given
		client := aws.NewLambdaClient()

		// When
		lambdaResponse := aws.InvokeAndMarshallLambdaResponse(test, client, "inversify_demo_function")

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
