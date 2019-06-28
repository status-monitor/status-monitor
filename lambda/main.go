package main

import (
	"errors"

	"github.com/aws/aws-lambda-go/lambda"
)

// Request define what needs to be passed
type Request struct {
	Protocol string `json:"protocol"`
	Host     string `json:"host"`
	Path     string `json:"path"`
}

// Response returns a duration (md) and a status code
type Response struct {
	Ms     int `json:"ms"`
	Status int `json:"status"`
}

func handleLambdaEvent(event Request) (response Response, err error) {
	if event.Host == "" || event.Path == "" || event.Protocol == "" {
		return response, errors.New("Wrong arguments")
	}
	return Response{Ms: 200, Status: 200}, nil
}

func main() {
	lambda.Start(handleLambdaEvent)
}
