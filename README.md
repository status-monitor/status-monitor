<h1 align="center">Status Monitor</h1>
<h3 align="center">A powerful up/down status monitor tool</h3>

<p align="center">
    <a href="https://codeclimate.com/github/Mokto/status-monitor/maintainability"><img src="https://api.codeclimate.com/v1/badges/b862d062fd6bb4174ba0/maintainability" alt="Maintainability" /></a>
    <a href="https://circleci.com/gh/status-monitor/status-monitor"><img src="https://circleci.com/gh/status-monitor/status-monitor.svg?style=svg" alt="CircleCI" /></a>
    <br /><br />
    <img width="877" alt="Home" src="https://user-images.githubusercontent.com/5103928/61823613-6c608580-ae5c-11e9-84bb-ec11bd23d244.png">
    <br />
    <img width="1035" alt="Website details" src="https://user-images.githubusercontent.com/5103928/61823614-6cf91c00-ae5c-11e9-9bd8-c1cb46e0f5d9.png">
</p>


## Functionalities

- Runs health checks at a defined interval (5s, 10s, 30s, etc...)
- Gets a Slack notification if anything goes wrong
- Allows to run any HTTP method and to pass some data in the request's body
- AWS lambda support : set up your AWS credentials to run your health check from multiple locations (16 available).
- Uses InfluxDb database - therefore fully integrated with Grafana.

#### Planned (PRs welcomed)

- Support for equivalent of AWS Lambda (Google Cloud Functions, Azure functions)
- Support for other notification services (Telegram, Twilio, Hipchat, etc...)
- Grafana dashboards

## What the heck with AWS Lambda ?

Well, first AWS lambda allows you to run your health checks from all around the world.
Second, with AWS Lambda free tier available on all customers indefinitely, you can have your health checks for free ! 
Let's see a common scenario :

- Test google.com from 2 different locations every 5 seconds. It means you can have really fast notifications about your website/service being down. (~520 000 calls per month)
- Test google.com from 10 different locations every minute. It means you can have reliable health checks and response times from all around the world. (~440 000 calls per month)

## Installation

### Helm

Installing the [helm chart](https://github.com/status-monitor/charts) will install Status Monitor, MongoDB, InfluxDB and RabbitMQ.

`helm repo add status-monitor https://status-monitor.github.io/charts`

`helm upgrade --namespace status-monitor status-monitor status-monitor/status-monitor --set encryptionKey=XXXXX --install`

You'll need to install an Ingress, a VirtualService (istio), or any equivalent to make the service available on port 3000.

### Docker Compose

After cloning the project, run 

`cd deployments/docker && docker-compose up -d `

Status Monitor will be available on port 3000.

## Configuration

If you go to the settings tabs, you can configure :
- The [slack webhook](https://api.slack.com/incoming-webhooks).
- The AWS access and secret (encrypted in your database) will allow Lambda Functions to be created and executed. To this end, you can create an AWS user with the following policy :
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "lambda:CreateFunction",
                "lambda:UpdateFunctionCode",
                "lambda:ListFunctions",
                "lambda:InvokeFunction"
            ],
            "Resource": "*"
        }
    ]
}
```

## AWS supported regions

- us-east-1
- us-east-2
- us-west-1
- us-west-2
- ca-central-1
- eu-central-1
- eu-west-1
- eu-west-2
- eu-west-3
- eu-north-1
- ap-northeast-1
- ap-northeast-2
- ap-southeast-1
- ap-southeast-2
- ap-south-1
- sa-east-1


## Help development

`npm install`

`docker-compose up -d`

`npm run dev`

Our stack is :

- NodeJS / Express
- Next.js
- React
- Styled-components
