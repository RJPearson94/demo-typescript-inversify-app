module.exports = {
  repositoryUrl: 'https://github.com/RJPearson94/demo-typescript-inversify-app.git',
  tagFormat: 'v${version}',
  branch: 'master',
  plugins: ['@semantic-release/commit-analyzer', '@semantic-release/release-notes-generator', '@semantic-release/github']
};
