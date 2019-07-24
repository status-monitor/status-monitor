[![Maintainability](https://api.codeclimate.com/v1/badges/b862d062fd6bb4174ba0/maintainability)](https://codeclimate.com/github/Mokto/status-monitor/maintainability)

[![CircleCI](https://circleci.com/gh/status-monitor/status-monitor.svg?style=svg)](https://circleci.com/gh/status-monitor/status-monitor)


# Status Monitor

<img width="877" alt="Home" src="https://user-images.githubusercontent.com/5103928/61823613-6c608580-ae5c-11e9-84bb-ec11bd23d244.png">
<img width="1035" alt="Website details" src="https://user-images.githubusercontent.com/5103928/61823614-6cf91c00-ae5c-11e9-9bd8-c1cb46e0f5d9.png">


## Functionalities

- Run healthchecks at a defined interval (5s, 10s, 30s, etc...)
- Get a Slack notification if something is wrong
- AWS lambda support : set up your AWS credentials to run your healthcheck from multiple locations (16 availables).
- Allow to define multiple scenarios per website tested. For example, you can test a website from 2 zones every 5 seconds, and check the response from more than all available zones, every minute. It means by using AWS Lambda, you can easily have a free multi-zone healthcheck tool!
- Uses influxDb database - fully integrated with Grafana.

* Planned (PRs welcomed) *
- Support for equivalent of AWS Lambda (Google Cloud Functions, Azure functions)
- Support for other notification services (Telegram, twilio, hipchat, etc...)
- Grafana dashboards

## Installation

### Helm

Installing the [helm chart](https://github.com/status-monitor/charts) will install Status Monitor, MongoDB, InfluxDB and RabbitMQ.

`helm repo index --url https://status-monitor.github.io/charts ../charts`

`helm upgrade --namespace status-monitor status-monitor status-monitor/status-monitor --set encryptionKey=XXXXX --install`

You'll need to install an Ingress, a VirtualService (istio), or any equivalent to make the service available on port 3000.

### Docker Compose

After cloning the project, run 

`cd deployments/docker && docker-compose up -d `

Status Monitor will be available on port 3000.

## Configuration

If you go to the settings tabs, you can configure :
- the [slack webhook](https://api.slack.com/incoming-webhooks).
- An AWS access and secret (will be encrypted in your database) : will allow Lambda Functions creation and execution. For that you can create an AWS user with the following policy :
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

#### AWS supported regions

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
