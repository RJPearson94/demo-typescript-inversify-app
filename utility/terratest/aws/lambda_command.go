package aws

import (
	"github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/lambda"
	"encoding/json"
	"testing"
)

func NewLambdaClient() *lambda.Lambda {
	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))
	
	return lambda.New(sess, aws.NewConfig().WithRegion("eu-west-1"))
}

func InvokeAndMarshallLambdaResponse(test *testing.T, lambdaClient *lambda.Lambda, functionName string) LambdaResponse {
	result := InvokeLambda(test, lambdaClient, functionName)
	
	var lambdaResponse LambdaResponse
	err := json.Unmarshal(result.Payload, &lambdaResponse); if err != nil {
		test.Fatal(err)
	}
	return lambdaResponse
}

func InvokeLambda(test *testing.T, lambdaClient *lambda.Lambda, functionName string) *lambda.InvokeOutput {
	result, err := lambdaClient.Invoke(&lambda.InvokeInput{FunctionName: aws.String(functionName)}); if err != nil {
		test.Fatal(err)
	}
	return result
}