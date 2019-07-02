#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Version parameter is required"
    exit 1
fi

rm -f build/main | true
cd lambda && GOOS=linux go build main.go && cd ../
mv lambda/main build/
rm -f lambda.zip | true
zip -j build/lambda-r$1.zip build/main
aws s3 cp build/lambda-r$1.zip s3://statusmonitor --acl public-read