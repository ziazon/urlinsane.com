.PHONY: help build build-test run-build publish release lint test-unit test-e2e
.DEFAULT_GOAL := help

IMAGE_NAME=cybersectech-io
TEST_IMAGE_NAME=$(IMAGE_NAME)-test
PROJECT_ID=cyberse
BUILD_CMD=docker build

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: ## builds docker container
	$(BUILD_CMD) --target serve -t $(IMAGE_NAME) .

build-test: ## builds docker container used for tests
	$(BUILD_CMD) --target test -t $(TEST_IMAGE_NAME) .

publish: ## builds docker container in gcr
	@echo 'publish $(IMAGE_NAME) to GCP Project ID: $(PROJECT_ID)'
	gcloud builds submit --tag gcr.io/$(PROJECT_ID)/$(IMAGE_NAME)

release: publish ## deploys the service
	gcloud beta run deploy --image gcr.io/$(PROJECT_ID)/$(IMAGE_NAME)

run-build: build ## runs docker container locally reachable at http:://localhost:8080
	docker run --name $(IMAGE_NAME) --rm -p 8080:80 --env .env $(IMAGE_NAME)

lint: ## runs linter from docker context
	docker run $(TEST_IMAGE_NAME) npm run lint

test-unit: ## runs unit tests from docker context
	docker run $(TEST_IMAGE_NAME) npm run test:unit

test-e2e: ## runs end to end tests in headless mode from docker context
	docker run $(TEST_IMAGE_NAME) npm run test:e2e
