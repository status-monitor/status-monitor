#!/bin/bash

helm package deployments/helm/status-monitor --destination ../charts
helm repo index --url https://status-monitor.github.io/charts ../charts
