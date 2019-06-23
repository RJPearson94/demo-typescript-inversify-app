module.exports = {
  hooks: {
    'pre-commit': 'yarn format:all & yarn lint:all'
  }
};
