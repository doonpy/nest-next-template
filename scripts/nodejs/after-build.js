const fs = require('fs');
const { readdirSync } = fs;
const rimraf = require('rimraf');
const { resolve } = require('path');

function* getFiles(dir) {
  const dirents = readdirSync(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

function removeUnnecessaryFiles() {
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

  for (const file of getFiles(process.cwd())) {
    if (!artifacts.some((artifact) => file.includes(artifact))) {
      console.log(`-> Delete: ${file}`);
      rimraf.sync(file);
    }
  }
}

(function() {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  removeUnnecessaryFiles();
  console.log('-> Done!');
})();
