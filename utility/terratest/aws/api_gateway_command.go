package aws

import (
	"testing"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/apigateway"
)

func NewApiGatewayClient() *apigateway.APIGateway {
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))

	return apigateway.New(sess, aws.NewConfig().WithRegion("eu-west-1"))
}

func GetApiKey(test *testing.T, apiGatewayClient *apigateway.APIGateway, apiKeyId string) *string {
	result, err := apiGatewayClient.GetApiKey(&apigateway.GetApiKeyInput{ApiKey: aws.String(apiKeyId), IncludeValue: aws.Bool(true)})
	if err != nil {
		test.Fatal(err)
	}
	return result.Value
}
