{
  "openapi": "3.0.1",
  "info": {
    "title": "${title}",
    "description": "${description}",
    "version": "${version}"
  },
  "paths": {
    "/v1/greet": {
      "get": {
        "summary": "Provide Greeting Message",
        "description": "Provide Greeting Message when lambda is invoked. Lambda is written in TypeScript and uses Inversify for Dependency Injection",
        "operationId": "getV1Greet",
        "x-amazon-apigateway-integration": {
          "uri": "${lambda_excution_uri}",
          "passthroughBehavior": "when_no_match",
          "timeoutInMillis": 10000,
          "httpMethod": "POST",
          "type": "aws_proxy"
        },
        "responses": {
          "200": {
            "description": "Successfully Greet",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/GreetingResponse"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "GreetingResponse": {
        "type": "object",
        "properties": {
          "message": {
            "type": "string"
          }
        }
      }
    }
  }
}