module.exports = {
  '*.{ts,js,json,yml,md}': ['yarn prettier --write'],
  '*.go': ['gofmt'],
  '*.{ts,js}': ['yarn lint --fix'],
  '*.{hcl}': ['terragrunt hclfmt'],
  '*.{tf}': ['terraform fmt']
};
