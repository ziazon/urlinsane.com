.PHONY: help build build-test run-build publish release lint test-unit test-e2e
.DEFAULT_GOAL := help

SERVICE_IMAGE_NAME=cybersectech-io
TEST_IMAGE_NAME=cybersectech-io-test
PROJECT_ID=cyberse
SERVICE_REGION=us-central1
SERVICE_ID=cybersectech-ui
BUILD_CMD=docker build
REPOSITORY_URI=gcr.io

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

login-gcr: ## docker login to repository account
	docker login https://$(REPOSITORY_URI)

build: ## builds service docker container
	$(BUILD_CMD) --target serve -t $(SERVICE_IMAGE_NAME) .

build-test: ## builds docker container used for tests
	$(BUILD_CMD) --target ui-test-build -t $(TEST_IMAGE_NAME) .

publish: ## builds docker container in gcr
	gcloud builds submit --tag $(REPOSITORY_URI)/$(PROJECT_ID)/$(SERVICE_IMAGE_NAME)

publish-test: ## builds docker container used for tests in gcr
	gcloud builds submit --tag $(REPOSITORY_URI)/$(PROJECT_ID)/$(TEST_IMAGE_NAME)

pull-build:
	docker pull $(REPOSITORY_URI)/$(PROJECT_ID)/$(SERVICE_IMAGE_NAME)

pull-build-test:
	docker pull $(REPOSITORY_URI)/$(PROJECT_ID)/$(TEST_IMAGE_NAME)

deploy: publish ## deploys the service
	gcloud beta run deploy --region=$(SERVICE_REGION) $(SERVICE_ID) --image $(REPOSITORY_URI)/$(PROJECT_ID)/$(SERVICE_IMAGE_NAME)

run-build: build ## runs docker container locally reachable at http:://localhost:8080
	docker run --name $(SERVICE_IMAGE_NAME) --rm -p 8080:80 --env .env $(SERVICE_IMAGE_NAME)

lint: ## runs linter from docker context
	docker run $(TEST_IMAGE_NAME) npm run lint

test-unit: ## runs unit tests from docker context
	docker run $(TEST_IMAGE_NAME) npm run test:unit
