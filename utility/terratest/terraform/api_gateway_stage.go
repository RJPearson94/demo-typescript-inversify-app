package terraform

import "github.com/zclconf/go-cty/cty"

type APIGatewayStage struct {
	ARN                  cty.Value         `cty:"arn"`
	AccessLogSettings    []string          `cty:"access_log_settings"`
	CacheClusterEnabled  cty.Value         `cty:"cache_cluster_enabled"`
	CacheClusterSize     cty.Value         `cty:"cache_cluster_size"`
	ClientCertificateID  cty.Value         `cty:"client_certificate_id"`
	DeploymentID         cty.Value         `cty:"deployment_id"`
	Description          string            `cty:"description"`
	DocumentationVersion cty.Value         `cty:"documentation_version"`
	ExecutionARN         cty.Value         `cty:"execution_arn"`
	ID                   cty.Value         `cty:"id"`
	InvokeURL            cty.Value         `cty:"invoke_url"`
	RestAPIID            cty.Value         `cty:"rest_api_id"`
	StageName            string            `cty:"stage_name"`
	Tags                 map[string]string `cty:"tags"`
	Variables            cty.Value         `cty:"variables"`
	XRayTracingEnabled   cty.Value         `cty:"xray_tracing_enabled"`
}
