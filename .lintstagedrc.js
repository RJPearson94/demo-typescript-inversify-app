module.exports = {
  '*.{ts,js,json,yml,md}': ['yarn prettier', 'git add'],
  '*.go': ['gofmt', 'git add'],
  '*.{tf,hcl}': ['terraform fmt', 'git add'],
  '*.{ts,js}': ['yarn lint:all --fix', 'git add']
};
