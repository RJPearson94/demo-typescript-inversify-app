default: deploy

clean: clean-artefact integration-test-clean e2e-test-clean

clean-artefact:
	rm -rf ./modules/lambda/inversify/dist

copy-artefact: clean-artefact
	mkdir ./modules/lambda/inversify/dist
	cp -f ../../dist/inversify-demo-lambda.zip ./modules/lambda/inversify/dist

download: 
	@echo "==> Downloading dependencies"
	go mod vendor

clean-integration-tests:
	find ./modules/lambda/inversify/test/integration -type d -name ".terragrunt-cache" -prune -exec rm -rf {} \;

integration-test: clean-integration-tests copy-artefact
	go test $(TESTARGS) -timeout=10m ./modules/lambda/inversify/test/integration 

clean-deployments:
	find ./deployment -type d -name ".terragrunt-cache" -prune -exec rm -rf {} \;

e2e-test: clean-deployments copy-artefact
	go test $(TESTARGS) -timeout=20m ./deployment/test/e2e

plan: copy-artefact
	cd deployment; terragrunt run-all plan

deploy: copy-artefact
	cd deployment; terragrunt run-all apply $(DEPLOYARGS)

destroy: copy-artefact
	cd deployment; terragrunt run-all destroy $(DESTROYARGS)

test: integration-test e2e-test

.PHONY: download clean-artefact copy-artefact clean test clean-integration-tests integration-test clean-deployments e2e-test plan deploy destroy