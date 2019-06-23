module.exports = {
  hooks: {
    'post-commit': 'yarn format:all & yarn lint:all',
    'prepare-commit-msg': 'exec < /dev/tty && git cz --hook'
  }
};
