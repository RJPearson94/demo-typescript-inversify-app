const { pnpPlugin } = require('@yarnpkg/esbuild-plugin-pnp');
const { ZipFile } = require('yazl');
const fs = require('fs');

const artefactPath = 'dist';

require('esbuild')
  .build({
    plugins: [pnpPlugin()],
    entryPoints: ['src/azure.ts'],
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
    zipfile.addFile(`src/proxies.json`, 'proxies.json');
    zipfile.addFile(`src/host.json`, 'host.json');
    zipfile.addFile(`dist/index.js`, 'InversifyFunction/dist/index.js');
    zipfile.addFile(`dist/index.js.map`, 'InversifyFunction/dist/index.js.map');
    zipfile.addFile(`src/function.json`, 'InversifyFunction/function.json');
    zipfile.outputStream.pipe(fs.createWriteStream(`dist/azure-function.zip`)).on('close', () => {
      console.log('Azure function artefact zipped successfully');
    });
    zipfile.end();
  })
  .catch(() => process.exit(1));
