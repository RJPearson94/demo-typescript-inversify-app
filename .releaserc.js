module.exports = {
  tagFormat: 'v${version}',
  branch: 'master',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'cd packages/lambda && ./create_release_artefact.sh ${nextRelease.version}'
      }
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'packages/lambda/release/*.zip'
          }
        ]
      }
    ]
  ]
};
