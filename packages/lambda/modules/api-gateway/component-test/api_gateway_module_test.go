package api_gateway_module_ctest

import (
	"fmt"
	"github.com/stretchr/testify/assert"
	"github.com/zclconf/go-cty/cty/gocty"
	"terratest_utility/terraform"
	"terratest_utility/helper"
	"testing"
)

func TestAPIGatewayModule(test *testing.T) {
	test.Parallel()

	environmentTag := "Environment"
	environmentTagResult := "Testing"
	resourceSuffix := helper.GenerateUUID(test)

	// Before
	plan := terraform.Plan(test, ".", resourceSuffix)

	test.Run("Should verify api gateway deployment", func(test *testing.T) {
		// Given

		// When
		apiGatewayDeploymentChange := terraform.GetResource(test, plan, "aws_api_gateway_deployment.greeting_deployment", &terraform.APIGatewayDeployment{})

		// Then
		assert.NotNil(test, apiGatewayDeploymentChange)

		var afterAPIGatewayDeploymentChange terraform.APIGatewayDeployment
		err := gocty.FromCtyValue(apiGatewayDeploymentChange.After, &afterAPIGatewayDeploymentChange)
		if err != nil {
			test.Fatal(err)
		}

		assert.NotNil(test, afterAPIGatewayDeploymentChange)
		assert.Equal(test, "Deployment of API Gateway to invoke inversify lambda function", afterAPIGatewayDeploymentChange.Description)
		assert.Equal(test, "To allow testing of solution", afterAPIGatewayDeploymentChange.StageDescription)
	})

	test.Run("Should verify api gateway rest api", func(test *testing.T) {
		// Given

		// When
		apiGatewayRestAPIChange := terraform.GetResource(test, plan, "aws_api_gateway_rest_api.greeting_rest_api", &terraform.APIGatewayRestAPI{})

		// Then
		assert.NotNil(test, apiGatewayRestAPIChange)

		var afterAPGatewayRestAPIChange terraform.APIGatewayRestAPI
		err := gocty.FromCtyValue(apiGatewayRestAPIChange.After, &afterAPGatewayRestAPIChange)
		if err != nil {
			test.Fatal(err)
		}

		assert.NotNil(test, afterAPGatewayRestAPIChange)
		assert.Equal(test, "HEADER", afterAPGatewayRestAPIChange.APIKeySource)
		assert.Equal(test, getAPIGatewayBody(resourceSuffix), helper.SanitizeString(afterAPGatewayRestAPIChange.Body))
		assert.Equal(test, "Example Typescript Inversify Lambda App", afterAPGatewayRestAPIChange.Description)
		assert.Equal(test, -1, afterAPGatewayRestAPIChange.MinimumCompressionSize)
		apiGatewayName := fmt.Sprintf("TypeScript Inversify Lambda App %s", resourceSuffix)
		assert.Equal(test, apiGatewayName, afterAPGatewayRestAPIChange.Name)
	})

	test.Run("Should verify api gateway stage", func(test *testing.T) {
		// Given

		// When
		apiGatewayStageChange := terraform.GetResource(test, plan, "aws_api_gateway_stage.greeting_stage", &terraform.APIGatewayStage{})

		// Then
		assert.NotNil(test, apiGatewayStageChange)

		var afterAPIGatewayStageChange terraform.APIGatewayStage
		err := gocty.FromCtyValue(apiGatewayStageChange.After, &afterAPIGatewayStageChange)
		if err != nil {
			test.Fatal(err)
		}

		assert.NotNil(test, afterAPIGatewayStageChange)
		assert.Equal(test, "Deployment of API Gateway stage", afterAPIGatewayStageChange.Description)
		assert.Equal(test, "dev", afterAPIGatewayStageChange.StageName)
		tags := afterAPIGatewayStageChange.Tags
		assert.NotEmpty(test, tags)
		assert.Equal(test, tags[environmentTag], environmentTagResult)
	})

	test.Run("Should verify lambda permission", func(test *testing.T) {
		// Given

		// When
		lambdaPermissionChange := terraform.GetResource(test, plan, "aws_lambda_permission.api_gateway_lambda", &terraform.LambdaPermission{})

		// Then
		assert.NotNil(test, lambdaPermissionChange)

		var afterLambdaPermissionChange terraform.LambdaPermission
		err := gocty.FromCtyValue(lambdaPermissionChange.After, &afterLambdaPermissionChange)
		if err != nil {
			test.Fatal(err)
		}

		assert.NotNil(test, afterLambdaPermissionChange)
		assert.Equal(test, "lambda:InvokeFunction", afterLambdaPermissionChange.Action)
		assert.Equal(test, "arn:aws:lambda:us-east-1:000000000000:function:example_lambda_arn", afterLambdaPermissionChange.FunctionName)
		assert.Equal(test, "apigateway.amazonaws.com", afterLambdaPermissionChange.Principle)
		assert.Equal(test, "AllowAPIGatewayInvoke", afterLambdaPermissionChange.StatementID)
	})

}

func getAPIGatewayBody(resourceSuffix string) string {
	return fmt.Sprintf("{\"openapi\": \"3.0.1\",\"info\": {\"title\": \"TypeScript Inversify Lambda App %s\",\"description\": \"Example Typescript Inversify Lambda App\",\"version\": \"1.0.0\"},\"paths\": {\"/v1/greet\": {\"get\": {\"summary\": \"Provide Greeting Message\",\"description\": \"Provide Greeting Message when lambda is invoked. Lambda is written in TypeScript and uses Inversify for Dependency Injection\",\"operationId\": \"getV1Greet\",\"x-amazon-apigateway-integration\": {\"uri\": \"arn:aws:apigateway:us-east-1:lambda:path/2015–03–31/functions/arn:aws:lambda:us-east-1:0000000000:function:example_lambda/invocations\",\"passthroughBehavior\": \"when_no_match\",\"timeoutInMillis\": 10000,\"httpMethod\": \"POST\",\"type\": \"aws_proxy\"},\"responses\": {\"200\": {\"description\": \"Successfully Greet\",\"content\": {\"application/json\": {\"schema\": {\"$ref\": \"#/components/schemas/GreetingResponse\"}}}}}}}},\"components\": {\"schemas\": {\"GreetingResponse\": {\"type\": \"object\",\"properties\": {\"message\": {\"type\": \"string\"}}}}}}", resourceSuffix)
}
