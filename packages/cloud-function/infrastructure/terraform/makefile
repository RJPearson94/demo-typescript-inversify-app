default: deploy

clean-deployments:
	find ./deployment -type d -name ".terragrunt-cache" -prune -exec rm -rf {} \;

plan:
	cd deployment; terragrunt run-all plan

deploy:
	cd deployment; terragrunt run-all apply $(DEPLOYARGS)

destroy:
	cd deployment; terragrunt run-all destroy $(DESTROYARGS)

.PHONY: clean-deployments plan deploy destroy