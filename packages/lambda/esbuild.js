const { pnpPlugin } = require('@yarnpkg/esbuild-plugin-pnp');
const { ZipFile } = require('yazl');
const fs = require('fs');

const artefactPath = 'dist';

require('esbuild')
  .build({
    plugins: [pnpPlugin()],
    entryPoints: ['src/lambda.ts'],
    tsconfig: './tsconfig.json',
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: `${artefactPath}/main.js`,
    platform: 'node',
    target: 'node14'
  })
  .then(() => {
    const zipfile = new ZipFile();
    zipfile.addFile(`${artefactPath}/main.js.map`, 'main.js.map');
    zipfile.addFile(`${artefactPath}/main.js`, 'main.js');
    zipfile.outputStream.pipe(fs.createWriteStream(`${artefactPath}/inversify-demo-lambda.zip`)).on('close', () => {
      console.log('Lambda artefact zipped successfully');
    });
    zipfile.end();
  })
  .catch(() => process.exit(1));
