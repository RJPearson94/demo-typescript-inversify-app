module.exports = {
  hooks: {
    'pre-commit': 'yarn format:all & yarn lint:all',
    'prepare-commit-msg': 'exec < /dev/tty && git cz --hook'
  }
};
