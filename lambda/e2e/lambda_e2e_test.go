package e2e

import (
	"fmt"
	"os"
	"os/exec"
	"terratest_utility/terraform"
	"testing"
)

func TestServiceEndToEnd(test *testing.T) {
	test.Parallel()

	// Given
	service := "."
	defer terraform.Destroy(test, service)
	terraform.Apply(test, service)
	invokeURL := terraform.Output(test, service, "invoke_url")

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