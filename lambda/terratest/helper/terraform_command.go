package helper

import (
	"fmt"
	"testing"
	"github.com/gruntwork-io/terratest/modules/terraform"
	"github.com/hashicorp/terraform/plans/planfile"
	"github.com/hashicorp/terraform/plans"
)

func Plan(test *testing.T, path string) *plans.Plan {
	tfOptions := setupTerraformOptions(path)

	workingDirectory := GetCurrentWorkingDirectory(test)
	uuid := GenerateUUID(test)
	planFilePath := fmt.Sprintf("%s/main-%s.tfplan", workingDirectory, uuid)

	runTerragruntPlan(test, tfOptions, planFilePath)
	return readPlanFile(test, planFilePath)
}

func setupTerraformOptions(path string) *terraform.Options {
	return &terraform.Options{
		TerraformBinary: "terragrunt",
		TerraformDir: path,
	}
}

func runTerragruntPlan(test *testing.T, tfOptions *terraform.Options, planFilePath string) {
	planOutputArgument := fmt.Sprintf("-out=%s", planFilePath)
	terraform.RunTerraformCommand(test, tfOptions, terraform.FormatArgs(tfOptions, "plan", "--input=false", planOutputArgument)...)
}

func readPlanFile(test *testing.T, planFilePath string) *plans.Plan {
	planReader, err := planfile.Open(planFilePath); if err != nil {
		test.Fatal(err)
	}
	defer planReader.Close()
	plan, err := planReader.ReadPlan(); if err != nil {
		test.Fatal(err)
	}
	return plan
}