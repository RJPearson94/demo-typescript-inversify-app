package terratests

import (
	"github.com/stretchr/testify/assert"
	"github.com/zclconf/go-cty/cty/gocty"
	"lambda-module-test/resources"
	"terratest-helper"
	"testing"
)

func Test_MainComponentTests(test *testing.T) {
	test.Parallel()

	// Setup
	setup := "../../../terratest/helper/setup"
	defer helper.Destroy(test, setup)
	helper.Apply(test, setup)

	// Before
	plan := helper.Plan(test, ".")

	test.Run("Should verify cloudwatch log group", func(test *testing.T) {
		// Given

		// When
		cloudwatchLogGroupChange := helper.GetResource(test, plan, "aws_cloudwatch_log_group.inversify_demo_log_group", &resources.CloudwatchLogGroup{})

		// Then
		assert.NotNil(test, cloudwatchLogGroupChange)

		var afterCloudwatchLogGroupChange resources.CloudwatchLogGroup
		err := gocty.FromCtyValue(cloudwatchLogGroupChange.After, &afterCloudwatchLogGroupChange)
		if err != nil {
			test.Fatal(err)
		}

		assert.NotNil(test, afterCloudwatchLogGroupChange)
		assert.Equal(test, "/aws/lambda/inversify_demo_function", afterCloudwatchLogGroupChange.Name)
		assert.Equal(test, 14, afterCloudwatchLogGroupChange.Retention)
		tags := afterCloudwatchLogGroupChange.Tags
		assert.NotEmpty(test, tags)
		assert.Equal(test, tags["Environment"], "Localstack")
	})

	test.Run("Should verify lambda Function", func(test *testing.T) {
		// Given

		// When
		lambdaFunctionChange := helper.GetResource(test, plan, "aws_lambda_function.inversify_demo_function", &resources.LambdaFunction{})

		// Then
		assert.NotNil(test, lambdaFunctionChange)

		var afterlambdaFunctionChange resources.LambdaFunction
		err := gocty.FromCtyValue(lambdaFunctionChange.After, &afterlambdaFunctionChange)
		if err != nil {
			test.Fatal(err)
		}

		assert.NotNil(test, afterlambdaFunctionChange)
		assert.Empty(test, afterlambdaFunctionChange.DeadLetterConfig)
		assert.Equal(test, "Example Typescript Inversify Lambda", afterlambdaFunctionChange.Description)
		assert.Empty(test, afterlambdaFunctionChange.EnvironmentVariables)
		assert.Equal(test, "inversify_demo_function", afterlambdaFunctionChange.FunctionName)
		assert.Equal(test, "main.handler", afterlambdaFunctionChange.Handler)
		assert.Equal(test, 128, afterlambdaFunctionChange.MemorySize)
		assert.Equal(test, false, afterlambdaFunctionChange.Publish)
		assert.Equal(test, -1, afterlambdaFunctionChange.ReservedConcurrentExecutions)
		assert.Equal(test, "nodejs10.x", afterlambdaFunctionChange.Runtime)
		assert.Equal(test, "inversify-demo", afterlambdaFunctionChange.S3Bucket)
		assert.Equal(test, "inversify-demo-lambda.zip", afterlambdaFunctionChange.S3Key)
		tags := afterlambdaFunctionChange.Tags
		assert.NotEmpty(test, tags)
		assert.Equal(test, tags["Environment"], "Localstack")
		assert.Equal(test, 30, afterlambdaFunctionChange.Timeout)
		assert.Empty(test, afterlambdaFunctionChange.VPCConfig)
	})

	test.Run("Should verify lambda iam policy", func(test *testing.T) {
		// Given

		// When
		iamPolicyChange := helper.GetResource(test, plan, "aws_iam_policy.inversify_demo_lambda_policy", &resources.IAMPolicy{})

		// Then
		assert.NotNil(test, iamPolicyChange)

		var afterIAMPolicyChange resources.IAMPolicy
		err := gocty.FromCtyValue(iamPolicyChange.After, &afterIAMPolicyChange)
		if err != nil {
			test.Fatal(err)
		}

		assert.NotNil(test, afterIAMPolicyChange)
		assert.Equal(test, "IAM policy for logging from a lambda", afterIAMPolicyChange.Description)
		assert.Equal(test, "inversify_demo_lambda_policy", afterIAMPolicyChange.Name)
		assert.Equal(test, "/", afterIAMPolicyChange.Path)
		assert.Equal(test, getPolicyString(), helper.SanitizeString(afterIAMPolicyChange.Policy))
	})

	test.Run("Should verify lambda iam role", func(test *testing.T) {
		// Given

		// When
		iamRoleChange := helper.GetResource(test, plan, "aws_iam_role.inversify_demo_iam", &resources.IAMRole{})

		// Then
		assert.NotNil(test, iamRoleChange)

		var afterIAMRoleChange resources.IAMRole
		err := gocty.FromCtyValue(iamRoleChange.After, &afterIAMRoleChange)
		if err != nil {
			test.Fatal(err)
		}

		assert.NotNil(test, afterIAMRoleChange)
		assert.Equal(test, getRoleString(), helper.SanitizeString(afterIAMRoleChange.AssumeRolePolicy))
		assert.Equal(test, "Lambda IAM Role", afterIAMRoleChange.Description)
		assert.Equal(test, false, afterIAMRoleChange.ForceDetachPolicies)
		assert.Equal(test, 3600, afterIAMRoleChange.MaxSessionDuration)
		assert.Equal(test, "inversify_demo_iam", afterIAMRoleChange.Name)
		assert.Equal(test, "/", afterIAMRoleChange.Path)
		tags := afterIAMRoleChange.Tags
		assert.NotEmpty(test, tags)
		assert.Equal(test, tags["Environment"], "Localstack")
	})

	test.Run("Should verify lambda iam role policy attachment", func(test *testing.T) {
		// Given

		// When
		iamRolePolicyAttachmentChange := helper.GetResource(test, plan, "aws_iam_role_policy_attachment.lambda_logs", &resources.IAMRolePolicyAttachment{})

		// Then
		assert.NotNil(test, iamRolePolicyAttachmentChange)

		var afterIAMRolePolicyAttachmentChange resources.IAMRolePolicyAttachment
		err := gocty.FromCtyValue(iamRolePolicyAttachmentChange.After, &afterIAMRolePolicyAttachmentChange)
		if err != nil {
			test.Fatal(err)
		}

		assert.NotNil(test, afterIAMRolePolicyAttachmentChange)
		assert.Equal(test, "inversify_demo_iam", afterIAMRolePolicyAttachmentChange.Role)
	})

}

func getPolicyString() string {
	return "{\"Version\": \"2012-10-17\",\"Statement\": [{\"Action\": [\"logs:CreateLogStream\",\"logs:PutLogEvents\"],\"Resource\": \"arn:aws:logs:*:*:*\",\"Effect\": \"Allow\"}]}"
}

func getRoleString() string {
	return "{\"Version\": \"2012-10-17\",\"Statement\": [{\"Action\": \"sts:AssumeRole\",\"Principal\": {\"Service\": \"lambda.amazonaws.com\"},\"Effect\": \"Allow\"}]}"
}
