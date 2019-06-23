module.exports = {
  repositoryUrl: 'https://github.com/RJPearson94/demo-typescript-express-app.git',
  tagFormat: 'v${version}',
  branch: 'master',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'generated-docs/CHANGELOG.md'
      }
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'chmod +x doc-generation.sh && ./doc-generation.sh'
      }
    ],
    '@semantic-release/github'
  ]
};
