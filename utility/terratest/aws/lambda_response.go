package aws

type LambdaResponse struct {
    StatusCode int     `json:"statusCode"`
    Body       string  `json:"body"`
}