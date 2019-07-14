package docker

import (
	"github.com/gruntwork-io/terratest/modules/docker"
	"testing"
)

func Up(test *testing.T, path string) {
	dockerOptions := setupDockerComposeOptions(path)
	docker.RunDockerCompose(test, dockerOptions, "up", "--detach")
}

func Down(test *testing.T, path string) {
	dockerOptions := setupDockerComposeOptions(path)
	docker.RunDockerCompose(test, dockerOptions, "down", "--rmi", "all")
}

func setupDockerComposeOptions(path string) *docker.Options {
	return &docker.Options{
		WorkingDir: path,
	}
}
