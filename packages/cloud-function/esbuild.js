const { pnpPlugin } = require('@yarnpkg/esbuild-plugin-pnp');
const { ZipFile } = require('yazl');
const fs = require('fs');

const artefactPath = 'modules/function/inversify/dist';

require('esbuild')
  .build({
    plugins: [pnpPlugin()],
    entryPoints: ['src/gcp.ts'],
    tsconfig: './tsconfig.json',
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: `${artefactPath}/index.js`,
    platform: 'node',
    target: 'node14'
  })
  .then(() => {
    const zipfile = new ZipFile();
    zipfile.addFile(`${artefactPath}/index.js.map`, 'index.js.map');
    zipfile.addFile(`${artefactPath}/index.js`, 'index.js');
    zipfile.outputStream.pipe(fs.createWriteStream(`${artefactPath}/inversify-demo-cloud-function.zip`)).on('close', () => {
      console.log('Function artefact zipped successfully');
    });
    zipfile.end();
  })
  .catch(() => process.exit(1));
