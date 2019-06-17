package helper

import (
	uuidGenerator "github.com/hashicorp/go-uuid"
	"strings"
	"testing"
)

func GenerateUUID(test *testing.T) string {
	uuid, err := uuidGenerator.GenerateUUID()
	if err != nil {
		test.Fatal(err)
	}
	return uuid
}

func SanitizeString(str string) string {
	strWithoutNewLines := strings.Replace(str, "\n", "", -1)
	return strings.Replace(strWithoutNewLines, "  ", "", -1)
}
