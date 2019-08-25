package root_module_ctest

import (
	"github.com/stretchr/testify/assert"
	"terratest_utility/helper"
	"terratest_utility/terraform"
	"testing"
)

func TestRootModule(test *testing.T) {
	test.Parallel()

	resourceSuffix := helper.GenerateUUID(test)

	// Before
	plan := terraform.Plan(test, ".", resourceSuffix)

	test.Run("Should verify api gateway resources", func(test *testing.T) {
		// Given

		// When
		apiGatewayDeploymentChange := terraform.GetResourceInstanceChange(plan, "module.inversify_api_gateway.aws_api_gateway_deployment.greeting_deployment")
		apiGatewayRestAPIChange := terraform.GetResourceInstanceChange(plan, "module.inversify_api_gateway.aws_api_gateway_rest_api.greeting_rest_api")
		apiGatewayStageChange := terraform.GetResourceInstanceChange(plan, "module.inversify_api_gateway.aws_api_gateway_stage.greeting_stage")
		lambdaPermissionChange := terraform.GetResourceInstanceChange(plan, "module.inversify_api_gateway.aws_lambda_permission.api_gateway_lambda")

		// Then
		assert.NotNil(test, apiGatewayDeploymentChange)
		assert.NotNil(test, apiGatewayRestAPIChange)
		assert.NotNil(test, apiGatewayStageChange)
		assert.NotNil(test, lambdaPermissionChange)
	})

	test.Run("Should verify lambda resources", func(test *testing.T) {
		// Given

		// When
		lambdaLogGroupChange := terraform.GetResourceInstanceChange(plan, "module.inversify_lambda.aws_cloudwatch_log_group.inversify_demo_log_group")
		lambdaIAMPolicyChange := terraform.GetResourceInstanceChange(plan, "module.inversify_lambda.aws_iam_policy.inversify_demo_lambda_policy")
		lambdaIAMRoleChange := terraform.GetResourceInstanceChange(plan, "module.inversify_lambda.aws_iam_role.inversify_demo_iam")
		lambdaIAMRolePolicyChange := terraform.GetResourceInstanceChange(plan, "module.inversify_lambda.aws_iam_role_policy_attachment.lambda_logs")
		lambdaFunctionChange := terraform.GetResourceInstanceChange(plan, "module.inversify_lambda.aws_lambda_function.inversify_demo_function")

		// Then
		assert.NotNil(test, lambdaLogGroupChange)
		assert.NotNil(test, lambdaIAMPolicyChange)
		assert.NotNil(test, lambdaIAMRoleChange)
		assert.NotNil(test, lambdaIAMRolePolicyChange)
		assert.NotNil(test, lambdaFunctionChange)
	})

}
