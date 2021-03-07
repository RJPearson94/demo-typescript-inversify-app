const { pnpPlugin } = require('@yarnpkg/esbuild-plugin-pnp');

const artefactPath = 'dist';

require('esbuild')
  .build({
    plugins: [pnpPlugin()],
    entryPoints: ['src/twilio.ts'],
    tsconfig: './tsconfig.json',
    bundle: true,
    minify: true,
    sourcemap: 'inline',
    outfile: `${artefactPath}/index.js`,
    platform: 'node',
    target: 'node14'
  })
  .catch(() => process.exit(1));
