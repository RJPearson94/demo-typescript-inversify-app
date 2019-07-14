package terraform

import "github.com/zclconf/go-cty/cty"

type LambdaFunction struct {
	ARN                          cty.Value         `cty:"arn"`
	DeadLetterConfig             []string          `cty:"dead_letter_config"`
	Description                  string            `cty:"description"`
	EnvironmentVariables         []string          `cty:"environment"`
	Filename                     string        	   `cty:"filename"`
	FunctionName                 string            `cty:"function_name"`
	Handler                      string            `cty:"handler"`
	ID                           cty.Value         `cty:"id"`
	InvokeARN                    cty.Value         `cty:"invoke_arn"`
	KMSKeyARN                    cty.Value         `cty:"kms_key_arn"`
	LastModifiedDate             cty.Value         `cty:"last_modified"`
	Layers                       cty.Value         `cty:"layers"`
	MemorySize                   int               `cty:"memory_size"`
	Publish                      bool              `cty:"publish"`
	QualifiedARN                 cty.Value         `cty:"qualified_arn"`
	ReservedConcurrentExecutions int               `cty:"reserved_concurrent_executions"`
	Role                         cty.Value         `cty:"role"`
	Runtime                      string            `cty:"runtime"`
	S3Bucket                     cty.Value         `cty:"s3_bucket"`
	S3Key                        cty.Value         `cty:"s3_key"`
	S3ObjectVersion              cty.Value         `cty:"s3_object_version"`
	SourceCodeHash               string            `cty:"source_code_hash"`
	SourceCodeSize               cty.Value         `cty:"source_code_size"`
	Tags                         map[string]string `cty:"tags"`
	TracingConfig                cty.Value         `cty:"tracing_config"`
	Timeout                      int               `cty:"timeout"`
	Timeouts                     cty.Value         `cty:"timeouts"`
	Version                      cty.Value         `cty:"version"`
	VPCConfig                    []string          `cty:"vpc_config"`
}
