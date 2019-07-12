package terratests

import (
	"github.com/stretchr/testify/assert"
	"terratest-helper"
	"testing"
)

func TestRootModule(test *testing.T) {
	test.Parallel()

	// Setup
	setup := "./helper/setup"
	defer helper.Destroy(test, setup)
	helper.Apply(test, setup)

	// Before
	plan := helper.Plan(test, ".")

	test.Run("Should verify api gateway resources", func(test *testing.T) {
		// Given

		// When
		apiGatewayDeploymentChange := helper.GetResourceInstanceChange(plan, "module.inversify_api_gateway.aws_api_gateway_deployment.greeting_deployment")
		apiGatewayRestAPIChange := helper.GetResourceInstanceChange(plan, "module.inversify_api_gateway.aws_api_gateway_rest_api.greeting_rest_api")
		apiGatewayStageChange := helper.GetResourceInstanceChange(plan, "module.inversify_api_gateway.aws_api_gateway_stage.greeting_stage")
		lambdaPermissionChange := helper.GetResourceInstanceChange(plan, "module.inversify_api_gateway.aws_lambda_permission.api_gateway_lambda")

		// Then
		assert.NotNil(test, apiGatewayDeploymentChange)
		assert.NotNil(test, apiGatewayRestAPIChange)
		assert.NotNil(test, apiGatewayStageChange)
		assert.NotNil(test, lambdaPermissionChange)
	})

	test.Run("Should verify lambda resources", func(test *testing.T) {
		// Given

		// When
		lambdaLogGroupChange := helper.GetResourceInstanceChange(plan, "module.inversify_lambda.aws_cloudwatch_log_group.inversify_demo_log_group")
		lambdaIAMPolicyChange := helper.GetResourceInstanceChange(plan, "module.inversify_lambda.aws_iam_policy.inversify_demo_lambda_policy")
		lambdaIAMRoleChange := helper.GetResourceInstanceChange(plan, "module.inversify_lambda.aws_iam_role.inversify_demo_iam")
		lambdaIAMRolePolicyChange := helper.GetResourceInstanceChange(plan, "module.inversify_lambda.aws_iam_role_policy_attachment.lambda_logs")
		lambdaFunctionChange := helper.GetResourceInstanceChange(plan, "module.inversify_lambda.aws_lambda_function.inversify_demo_function")

		// Then
		assert.NotNil(test, lambdaLogGroupChange)
		assert.NotNil(test, lambdaIAMPolicyChange)
		assert.NotNil(test, lambdaIAMRoleChange)
		assert.NotNil(test, lambdaIAMRolePolicyChange)
		assert.NotNil(test, lambdaFunctionChange)
	})

}
