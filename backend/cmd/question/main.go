package main

import (
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	// GET以外はBad Request
	if request.HTTPMethod != http.MethodGet {
		return &events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       "Bad Request",
		}, nil
	}

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Hello Netlify Functions",
	}, nil
}

func main() {
	// Start Handler
	lambda.Start(handler)
}
