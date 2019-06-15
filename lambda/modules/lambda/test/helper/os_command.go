package helper

import(
	"os"
	"testing"
)

func GetCurrentWorkingDirectory(test *testing.T) string {
	directory, err := os.Getwd(); if err != nil {
		test.Fatal(err)
	}
	return directory
}