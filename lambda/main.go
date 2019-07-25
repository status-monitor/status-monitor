package main

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"strings"
	"time"

	"github.com/aws/aws-lambda-go/lambda"
)

// Request define what needs to be passed
type Request struct {
	Protocol   string `json:"protocol"`
	Host       string `json:"host"`
	Path       string `json:"path"`
	HTTPMethod string `json:"httpMethod"`
	HTTPData   string `json:"httpData"`
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

	var data io.Reader
	if event.HTTPData != "" {
		data = strings.NewReader(event.HTTPData)
	}

	resp, err := http.NewRequest(event.HTTPMethod, url.String(), data)

	elapsed := time.Since(start)
	if err != nil {
		return response, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	fmt.Println("get:\n", string(body))

	return Response{Ms: int(elapsed.Seconds() * 1000), Status: resp.Response.StatusCode}, nil
}

func main() {
	lambda.Start(handleLambdaEvent)
}
