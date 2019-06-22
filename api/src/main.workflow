workflow "Workflow" {
  on = "@github/push"
  resolves = ["Clone project"]
}

workflow "Workflow2" {
  on = "@github/push"
  resolves = ["Clone project"]
}

action "Clone project" {
  uses = "@github/clone"
  args = ["Mokto/docker-kaniko-test"]
}

action "Docker build" {
  needs = ["Clone project"]
  uses = "@docker/build"
  # secrets = ["SLACK_WEBHOOK"]
  args = ["repo/image"]
}

action "Docker build 2 - 1" {
  needs = ["Docker build"]
  uses = "@docker/build"
  # secrets = ["SLACK_WEBHOOK"]
  args = ["repo/image"]
}

action "Docker build 2 - 2" {
  needs = ["Docker build"]
  uses = "@docker/build"
  # secrets = ["SLACK_WEBHOOK"]
  args = ["repo/image"]
}
