const { pnpPlugin } = require('@yarnpkg/esbuild-plugin-pnp');

require('esbuild')
  .build({
    plugins: [pnpPlugin()],
    entryPoints: ['src/server.ts'],
    tsconfig: './tsconfig.json',
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: 'dist/main.js',
    platform: 'node',
    target: 'node16'
  })
  .catch(() => process.exit(1));
