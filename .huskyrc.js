module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'prepare-commit-msg': 'exec < /dev/tty && git cz --hook',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
  }
};
