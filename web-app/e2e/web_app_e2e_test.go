package e2e

import (
	"fmt"
	"os/exec"
	"os"
	"terratest-utility/docker"
	"testing"
)

func TestDockerizedWebAppEndToEnd(test *testing.T) {
	test.Parallel()

	// Setup
	setup := "."
	defer docker.Down(test, setup)
	docker.Up(test, setup)

	// Given
	invokeURL := "http://localhost:3000"

	// When
	envVariables := fmt.Sprintf("URL=%s", invokeURL)
	cmd := exec.Command("yarn", "newman", "run", "postman-scripts/web-app.collection.json", "--env-var", envVariables, "-r", "cli")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	
	// Then
	err := cmd.Run(); if err != nil {
		test.Fatal(err)
	}

}
