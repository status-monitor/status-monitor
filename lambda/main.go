package main

import (
	"bytes"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

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

	var url bytes.Buffer
	url.WriteString(event.Protocol)
	url.WriteString(event.Host)
	url.WriteString(event.Path)

	start := time.Now()
	resp, err := http.Get(url.String())
	elapsed := time.Since(start)
	if err != nil {
		return response, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	fmt.Println("get:\n", string(body))

	return Response{Ms: int(elapsed.Seconds() * 1000), Status: resp.StatusCode}, nil
}

func main() {
	lambda.Start(handleLambdaEvent)
}
