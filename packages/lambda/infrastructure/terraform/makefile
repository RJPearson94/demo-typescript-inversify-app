default: deploy

clean: integration-test-clean e2e-test-clean

download: 
	@echo "==> Downloading dependencies"
	go mod vendor

clean-integration-tests:
	find ./modules/lambda/inversify/integration-test -type d -name ".terragrunt-cache" -prune -exec rm -rf {} \;
	find ./modules/lambda/inversify/integration-test -type f -name ".terraform.lock.hcl" -prune -exec rm -rf {} \;

integration-test: clean-integration-tests
	go test $(TESTARGS) -timeout=10m ./modules/lambda/inversify/integration-test

clean-deployments:
	find ./deployment -type d -name ".terragrunt-cache" -prune -exec rm -rf {} \;
	find ./deployment -type f -name ".terraform.lock.hcl" -prune -exec rm -rf {} \;

e2e-test: clean-deployments
	go test $(TESTARGS) -timeout=20m ./e2e

plan:
	cd deployment; terragrunt run-all plan

deploy:
	cd deployment; terragrunt run-all apply $(DEPLOYARGS)

destroy:
	cd deployment; terragrunt run-all destroy $(DESTROYARGS)

test: integration-test e2e-test

.PHONY: download clean test clean-integration-tests integration-test clean-deployments e2e-test plan deploy destroy