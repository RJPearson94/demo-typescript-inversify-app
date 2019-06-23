module.exports = {
  repositoryUrl: 'https://github.com/RJPearson94/demo-typescript-express-app.git',
  tagFormat: 'v${version}',
  branch: 'master',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/error',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/exec',
      {
        prepareCmd: './doc-generation.sh'
      }
    ],
    [
      ('@semantic-release/changelog',
      {
        changelogFile: 'generated-docs/CHANGELOG.md'
      })
    ],
    '@semantic-release/github'
  ]
};
