module.exports = {
  hooks: {
    'post-commit': 'yarn format:all & yarn lint:all',
    'prepare-commit-msg': 'exec < /dev/tty && git cz --hook',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
  }
};
