package lambda_module_ctest

import (
	"fmt"
	"github.com/stretchr/testify/assert"
	"github.com/zclconf/go-cty/cty/gocty"
	"terratest_utility/terraform"
	"terratest_utility/helper"
	"testing"
)

func TestLambdaModule(test *testing.T) {
	test.Parallel()

	environmentTag := "Environment"
	environmentTagResult := "Testing"
	resourceSuffix := helper.GenerateUUID(test)

	// Before
	plan := terraform.Plan(test, ".", resourceSuffix)

	test.Run("Should verify cloudwatch log group", func(test *testing.T) {
		// Given

		// When
		cloudwatchLogGroupChange := terraform.GetResource(test, plan, "aws_cloudwatch_log_group.inversify_demo_log_group", &terraform.CloudwatchLogGroup{})

		// Then
		assert.NotNil(test, cloudwatchLogGroupChange)

		var afterCloudwatchLogGroupChange terraform.CloudwatchLogGroup
		err := gocty.FromCtyValue(cloudwatchLogGroupChange.After, &afterCloudwatchLogGroupChange)
		if err != nil {
			test.Fatal(err)
		}

		assert.NotNil(test, afterCloudwatchLogGroupChange)
		logGroupName := fmt.Sprintf("/aws/lambda/inversify_demo_function_%s", resourceSuffix)
		assert.Equal(test, logGroupName, afterCloudwatchLogGroupChange.Name)
		assert.Equal(test, 14, afterCloudwatchLogGroupChange.Retention)
		tags := afterCloudwatchLogGroupChange.Tags
		assert.NotEmpty(test, tags)
		assert.Equal(test, tags[environmentTag], environmentTagResult)
	})

	test.Run("Should verify lambda Function", func(test *testing.T) {
		// Given

		// When
		lambdaFunctionChange := terraform.GetResource(test, plan, "aws_lambda_function.inversify_demo_function", &terraform.LambdaFunction{})

		// Then
		assert.NotNil(test, lambdaFunctionChange)

		var afterlambdaFunctionChange terraform.LambdaFunction
		err := gocty.FromCtyValue(lambdaFunctionChange.After, &afterlambdaFunctionChange)
		if err != nil {
			test.Fatal(err)
		}

		assert.NotNil(test, afterlambdaFunctionChange)
		assert.Empty(test, afterlambdaFunctionChange.DeadLetterConfig)
		assert.Equal(test, "Example Typescript Inversify Lambda", afterlambdaFunctionChange.Description)
		assert.Empty(test, afterlambdaFunctionChange.EnvironmentVariables)
		functionName := fmt.Sprintf("inversify_demo_function_%s", resourceSuffix)
		assert.Equal(test, functionName, afterlambdaFunctionChange.FunctionName)
		assert.Equal(test, "main.handler", afterlambdaFunctionChange.Handler)
		assert.Equal(test, 128, afterlambdaFunctionChange.MemorySize)
		assert.Equal(test, false, afterlambdaFunctionChange.Publish)
		assert.Equal(test, -1, afterlambdaFunctionChange.ReservedConcurrentExecutions)
		assert.Equal(test, "nodejs10.x", afterlambdaFunctionChange.Runtime)
		assert.Equal(test, "./dist/inversify-demo-lambda.zip", afterlambdaFunctionChange.Filename)
		assert.NotNil(test, afterlambdaFunctionChange.SourceCodeHash)
		tags := afterlambdaFunctionChange.Tags
		assert.NotEmpty(test, tags)
		assert.Equal(test, tags[environmentTag], environmentTagResult)
		assert.Equal(test, 30, afterlambdaFunctionChange.Timeout)
		assert.Empty(test, afterlambdaFunctionChange.VPCConfig)
	})

	test.Run("Should verify lambda iam policy", func(test *testing.T) {
		// Given

		// When
		iamPolicyChange := terraform.GetResource(test, plan, "aws_iam_policy.inversify_demo_lambda_policy", &terraform.IAMPolicy{})

		// Then
		assert.NotNil(test, iamPolicyChange)

		var afterIAMPolicyChange terraform.IAMPolicy
		err := gocty.FromCtyValue(iamPolicyChange.After, &afterIAMPolicyChange)
		if err != nil {
			test.Fatal(err)
		}

		assert.NotNil(test, afterIAMPolicyChange)
		assert.Equal(test, "IAM policy for logging from a lambda", afterIAMPolicyChange.Description)
		iamPolicyName := fmt.Sprintf("inversify_demo_lambda_policy_%s", resourceSuffix)
		assert.Equal(test, iamPolicyName, afterIAMPolicyChange.Name)
		assert.Equal(test, "/", afterIAMPolicyChange.Path)
		assert.Equal(test, getPolicyString(), helper.SanitizeString(afterIAMPolicyChange.Policy))
	})

	test.Run("Should verify lambda iam role", func(test *testing.T) {
		// Given

		// When
		iamRoleChange := terraform.GetResource(test, plan, "aws_iam_role.inversify_demo_iam", &terraform.IAMRole{})

		// Then
		assert.NotNil(test, iamRoleChange)

		var afterIAMRoleChange terraform.IAMRole
		err := gocty.FromCtyValue(iamRoleChange.After, &afterIAMRoleChange)
		if err != nil {
			test.Fatal(err)
		}

		assert.NotNil(test, afterIAMRoleChange)
		assert.Equal(test, getRoleString(), helper.SanitizeString(afterIAMRoleChange.AssumeRolePolicy))
		assert.Equal(test, "Lambda IAM Role", afterIAMRoleChange.Description)
		assert.Equal(test, false, afterIAMRoleChange.ForceDetachPolicies)
		assert.Equal(test, 3600, afterIAMRoleChange.MaxSessionDuration)
		iamRoleName := fmt.Sprintf("inversify_demo_iam_%s", resourceSuffix)
		assert.Equal(test, iamRoleName, afterIAMRoleChange.Name)
		assert.Equal(test, "/", afterIAMRoleChange.Path)
		tags := afterIAMRoleChange.Tags
		assert.NotEmpty(test, tags)
		assert.Equal(test, tags[environmentTag], environmentTagResult)
	})

	test.Run("Should verify lambda iam role policy attachment", func(test *testing.T) {
		// Given

		// When
		iamRolePolicyAttachmentChange := terraform.GetResource(test, plan, "aws_iam_role_policy_attachment.lambda_logs", &terraform.IAMRolePolicyAttachment{})

		// Then
		assert.NotNil(test, iamRolePolicyAttachmentChange)

		var afterIAMRolePolicyAttachmentChange terraform.IAMRolePolicyAttachment
		err := gocty.FromCtyValue(iamRolePolicyAttachmentChange.After, &afterIAMRolePolicyAttachmentChange)
		if err != nil {
			test.Fatal(err)
		}

		assert.NotNil(test, afterIAMRolePolicyAttachmentChange)
		iamRoleName := fmt.Sprintf("inversify_demo_iam_%s", resourceSuffix)
		assert.Equal(test, iamRoleName, afterIAMRolePolicyAttachmentChange.Role)
	})

}

func getPolicyString() string {
	return "{\"Version\": \"2012-10-17\",\"Statement\": [{\"Action\": [\"logs:CreateLogStream\",\"logs:PutLogEvents\"],\"Resource\": \"arn:aws:logs:*:*:*\",\"Effect\": \"Allow\"}]}"
}

func getRoleString() string {
	return "{\"Version\": \"2012-10-17\",\"Statement\": [{\"Action\": \"sts:AssumeRole\",\"Principal\": {\"Service\": \"lambda.amazonaws.com\"},\"Effect\": \"Allow\"}]}"
}
