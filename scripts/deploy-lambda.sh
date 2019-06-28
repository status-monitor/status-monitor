#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Version parameter is required"
    exit 1
fi

mkdir -p build
rm -f build/main | true
cd lambda && GOOS=linux go build main.go && cd ../
mv lambda/main build/
rm -f lambda.zip | true
zip -j build/lambda-r$1.zip build/main

# ap-east-1
for REGION in us-east-1 us-east-2 us-west-1 us-west-2 ca-central-1 eu-central-1 eu-west-1 eu-west-2 eu-west-3 eu-north-1 ap-northeast-1 ap-northeast-2 ap-southeast-1 ap-southeast-2 ap-south-1 sa-east-1 
do
	# aws s3api create-bucket --bucket statusmonitor-$REGION --region $REGION --create-bucket-configuration LocationConstraint=$REGION --acl public-read | true
    echo "Uploading function for region $REGION"
    aws s3 cp build/lambda-r$1.zip s3://statusmonitor-$REGION --acl public-read
done
