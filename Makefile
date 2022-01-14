VERSION := $(shell cat package.json | grep version | rev | cut -f 1 -d ' ' | rev | tr -d '"' | tr -d ',')

Nothing:
	@echo "No target provided. Stop."

.PHONY: docker-build
docker-build:
	@docker build -t ga4gh/gh-openapi-docs:${VERSION} .
