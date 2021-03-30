const fs = require('fs');
const rimraf = require('rimraf');
const { resolve } = require('path');
const { readdir } = fs.promises;

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

async function removeUnnecessaryFiles() {
  console.log('-> Remove unnecessary files...');
  const artifacts = [
    'dist',
    'node_modules',
    '.env',
    'Procfile',
    'LICENSE',
    'package.json',
    'yarn.lock',
    'next.config.js',
    'cache',
    '.profile.d',
    '.heroku',
    'prisma'
  ];

  for await (const file of getFiles(process.cwd())) {
    if (!artifacts.some((artifact) => file.includes(artifact))) {
      console.log(`-> Delete: ${file}`);
      rimraf.sync(file);
    }
  }
}

(async function () {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  await removeUnnecessaryFiles();
  console.log('-> Done!');
})();
