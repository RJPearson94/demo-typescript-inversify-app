package terraform

import (
	"fmt"
	"terratest_utility/helper"
	"testing"

	"github.com/gruntwork-io/terratest/modules/terraform"
	"github.com/hashicorp/terraform/plans"
	"github.com/hashicorp/terraform/plans/planfile"
)

func Apply(test *testing.T, path string, resource_suffix string) {
	tfOptions := setupTerraformOptions(path, resource_suffix)
	terraform.RunTerraformCommand(test, tfOptions, terraform.FormatArgs(tfOptions, "run-all", "apply", "-auto-approve")...)
}

func Output(test *testing.T, path string, key string, resource_suffix string) string {
	tfOptions := setupTerraformOptions(path, resource_suffix)
	return terraform.Output(test, tfOptions, key)
}

func OutputAll(test *testing.T, path string, resource_suffix string) map[string]interface{} {
	tfOptions := setupTerraformOptions(path, resource_suffix)
	return terraform.OutputAll(test, tfOptions)
}

func Destroy(test *testing.T, path string, resource_suffix string) {
	tfOptions := setupTerraformOptions(path, resource_suffix)
	terraform.RunTerraformCommand(test, tfOptions, terraform.FormatArgs(tfOptions, "run-all", "destroy", "-auto-approve")...)
}

func Plan(test *testing.T, path string, resource_suffix string) *plans.Plan {
	tfOptions := setupTerraformOptions(path, resource_suffix)

	workingDirectory := helper.GetCurrentWorkingDirectory(test)
	uuid := helper.GenerateUUID(test)
	planFilePath := fmt.Sprintf("%s/main-%s.tfplan", workingDirectory, uuid)

	runTerragruntPlan(test, tfOptions, planFilePath)
	return readPlanFile(test, planFilePath)
}

func setupTerraformOptions(path string, resource_suffix string) *terraform.Options {
	return &terraform.Options{
		TerraformBinary: "terragrunt",
		TerraformDir:    path,
		Vars:            map[string]interface{}{"resource_suffix": resource_suffix},
	}
}

func runTerragruntPlan(test *testing.T, tfOptions *terraform.Options, planFilePath string) {
	planOutputArgument := fmt.Sprintf("-out=%s", planFilePath)
	terraform.RunTerraformCommand(test, tfOptions, terraform.FormatArgs(tfOptions, "run-all", "plan", "--input=false", planOutputArgument)...)
}

func readPlanFile(test *testing.T, planFilePath string) *plans.Plan {
	planReader, err := planfile.Open(planFilePath)
	if err != nil {
		test.Fatal(err)
	}
	defer planReader.Close()
	plan, err := planReader.ReadPlan()
	if err != nil {
		test.Fatal(err)
	}
	return plan
}
