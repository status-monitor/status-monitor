#!/bin/bash

docker build -t statusmonitor/website:$1 .
docker push statusmonitor/website:$1