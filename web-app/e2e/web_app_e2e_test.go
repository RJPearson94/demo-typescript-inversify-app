package terratests

import (
	"fmt"
	"os/exec"
	"os"
	"web-app-e2e/helper"
	"testing"
)

func TestDockerizedWebAppEndToEnd(test *testing.T) {
	test.Parallel()

	// Setup
	setup := "."
	defer helper.Down(test, setup)
	helper.Up(test, setup)

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
