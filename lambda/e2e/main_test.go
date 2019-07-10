package terratests

import (
	"fmt"
	"os"
	"os/exec"
	"terratest-helper"
	"testing"
)

func Test_MainE2ETests(test *testing.T) {
	test.Parallel()

	// Setup
	setup := "../terratest/helper/setup"
	defer helper.Destroy(test, setup)
	helper.Apply(test, setup)

	// Given
	service := "."
	defer helper.Destroy(test, service)
	helper.Apply(test, service)
	invokeURL := helper.Output(test, service, "invoke_url")

	// When
	envVariables := fmt.Sprintf("URL=%s", invokeURL)
	cmd := exec.Command("yarn", "newman", "run", "postman-scripts/lambda.collection.json", "--env-var", envVariables, "-r", "cli")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	
	// Then
	err := cmd.Run(); if err != nil {
		test.Fatal(err)
	}
}
