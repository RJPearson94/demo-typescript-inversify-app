module.exports = {
  '*.{ts,js,json,yml,md}': ['yarn prettier --write', 'git add'],
  '*.go': ['gofmt', 'git add'],
  '*.{tf,hcl}': ['terraform fmt', 'git add'],
  '*.{ts,js}': ['yarn lint --fix', 'git add']
};
