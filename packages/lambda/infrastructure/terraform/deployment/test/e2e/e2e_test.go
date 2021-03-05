package e2e

import (
	"encoding/json"
	"fmt"
	"terratest_utility/aws"
	"terratest_utility/helper"
	"terratest_utility/terraform"
	"testing"

	http_helper "github.com/gruntwork-io/terratest/modules/http-helper"
	"github.com/stretchr/testify/assert"
)

func TestServiceEndToEnd(test *testing.T) {
	test.Parallel()

	resourceSuffix := helper.GenerateUUID(test)
	service := "../.."

	// Given
	defer terraform.Destroy(test, service, resourceSuffix)
	terraform.Apply(test, service, resourceSuffix)

	apiGateway := service + "/api-gateway"
	invokeURL := terraform.Output(test, apiGateway, "invoke_url", resourceSuffix)
	apiKeyId := terraform.Output(test, apiGateway, "api_key_id", resourceSuffix)

	client := aws.NewApiGatewayClient()
	apiKeyValue := aws.GetApiKey(test, client, apiKeyId)

	// When
	url := fmt.Sprintf("%s/v1/greet", invokeURL)
	headers := map[string]string{
		"x-api-key": *apiKeyValue,
	}
	statusCode, respBody := http_helper.HTTPDo(test, "GET", url, nil, headers, nil)

	// Then
	assert.Equal(test, 200, statusCode)
	parsedResponseBody := validateAndUnmarshalAPIResponseBody(test, respBody)
	assert.Equal(test, "HelloLambda", parsedResponseBody.Message)
}

func validateAndUnmarshalAPIResponseBody(test *testing.T, respBody string) APIResponseBody {
	assert.NotNil(test, respBody)

	var apiResponseBody APIResponseBody
	err := json.Unmarshal([]byte(respBody), &apiResponseBody)
	if err != nil {
		test.Fatal(err)
	}
	return apiResponseBody
}
