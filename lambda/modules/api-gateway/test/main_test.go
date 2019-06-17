package terratests

import (
	"api-gateway-module-test/resources"
	"github.com/stretchr/testify/assert"
	"github.com/zclconf/go-cty/cty/gocty"
	"terratest-helper"
	"testing"
)

func Test_MainComponentTests(test *testing.T) {
	test.Parallel()

	// Before
	plan := helper.Plan(test, ".")

	test.Run("Should verify api gateway deployment", func(test *testing.T) {
		// Given

		// When
		apiGatewayDeploymentChange := helper.GetResource(test, plan, "aws_api_gateway_deployment.greeting_deployment", &resources.APIGatewayDeployment{})

		// Then
		assert.NotNil(test, apiGatewayDeploymentChange)

		var afterAPIGatewayDeploymentChange resources.APIGatewayDeployment
		err := gocty.FromCtyValue(apiGatewayDeploymentChange.After, &afterAPIGatewayDeploymentChange)
		if err != nil {
			test.Fatal(err)
		}

		assert.NotNil(test, afterAPIGatewayDeploymentChange)
		assert.Equal(test, "Deployment of API Gateway to invoke inversify lambda function", afterAPIGatewayDeploymentChange.Description)
		assert.Equal(test, "To allow testing of solution", afterAPIGatewayDeploymentChange.StageDescription)
		assert.Equal(test, "dev", afterAPIGatewayDeploymentChange.StageName)
	})

	test.Run("Should verify api gateway rest api", func(test *testing.T) {
		// Given

		// When
		apiGatewayRestAPIChange := helper.GetResource(test, plan, "aws_api_gateway_rest_api.greeting_rest_api", &resources.APIGatewayRestAPI{})

		// Then
		assert.NotNil(test, apiGatewayRestAPIChange)

		var afterAPGatewayRestAPIChange resources.APIGatewayRestAPI
		err := gocty.FromCtyValue(apiGatewayRestAPIChange.After, &afterAPGatewayRestAPIChange)
		if err != nil {
			test.Fatal(err)
		}

		assert.NotNil(test, afterAPGatewayRestAPIChange)
		assert.Equal(test, "HEADER", afterAPGatewayRestAPIChange.APIKeySource)
		assert.Equal(test, getAPIGatewayBody(), helper.SanitizeString(afterAPGatewayRestAPIChange.Body))
		assert.Equal(test, "Example Typescript Inversify Lambda App", afterAPGatewayRestAPIChange.Description)
		assert.Equal(test, -1, afterAPGatewayRestAPIChange.MinimumCompressionSize)
		assert.Equal(test, "TypeScript Inversify Lambda App", afterAPGatewayRestAPIChange.Name)
	})

	test.Run("Should verify api gateway stage", func(test *testing.T) {
		// Given

		// When
		apiGatewayStageChange := helper.GetResource(test, plan, "aws_api_gateway_stage.greeting_stage", &resources.APIGatewayStage{})

		// Then
		assert.NotNil(test, apiGatewayStageChange)

		var afterAPIGatewayStageChange resources.APIGatewayStage
		err := gocty.FromCtyValue(apiGatewayStageChange.After, &afterAPIGatewayStageChange)
		if err != nil {
			test.Fatal(err)
		}

		assert.NotNil(test, afterAPIGatewayStageChange)
		assert.Equal(test, "Deployment of API Gateway stage", afterAPIGatewayStageChange.Description)
		assert.Equal(test, "dev", afterAPIGatewayStageChange.StageName)
		tags := afterAPIGatewayStageChange.Tags
		assert.NotEmpty(test, tags)
		assert.Equal(test, tags["Environment"], "Localstack")
	})

	test.Run("Should verify lambda permission", func(test *testing.T) {
		// Given

		// When
		lambdaPermissionChange := helper.GetResource(test, plan, "aws_lambda_permission.api_gateway_lambda", &resources.LambdaPermission{})

		// Then
		assert.NotNil(test, lambdaPermissionChange)

		var afterLambdaPermissionChange resources.LambdaPermission
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

func getAPIGatewayBody() string {
	return "{\"openapi\": \"3.0.1\",\"info\": {\"title\": \"TypeScript Inversify Lambda App\",\"description\": \"Example Typescript Inversify Lambda App\",\"version\": \"1.0.0\"},\"paths\": {\"/v1/greet\": {\"get\": {\"summary\": \"Provide Greeting Message\",\"description\": \"Provide Greeting Message when lambda is invoked. Lambda is written in TypeScript and uses Inversify for Dependency Injection\",\"operationId\": \"getV1Greet\",\"x-amazon-apigateway-integration\": {\"uri\": \"arn:aws:apigateway:us-east-1:lambda:path/2015–03–31/functions/arn:aws:lambda:us-east-1:0000000000:function:example_lambda/invocations\",\"passthroughBehavior\": \"when_no_match\",\"timeoutInMillis\": 10000,\"httpMethod\": \"POST\",\"type\": \"aws_proxy\"},\"responses\": {\"200\": {\"description\": \"Successfully Greet\",\"content\": {\"application/json\": {\"schema\": {\"$ref\": \"#/components/schemas/GreetingResponse\"}}}}}}}},\"components\": {\"schemas\": {\"GreetingResponse\": {\"type\": \"object\",\"properties\": {\"message\": {\"type\": \"string\"}}}}}}"
}
