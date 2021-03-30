const fs = require('fs');
const rimraf = require('rimraf');

function removeUnnecessaryFiles() {
  console.log('-> Remove unnecessary files...');
  const artifacts = [
    'dist',
    'node_modules',
    'env',
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
  const dirs = fs.readdirSync(process.cwd());
  dirs.forEach((dir) => {
    if (!artifacts.some((artifact) => dir.includes(artifact))) {
      console.log(`-> Delete: ${dir}`);
      rimraf.sync(dir);
    }
  });

  const devEnvPath = 'env/**/*/dev';
  console.log(`-> Delete: ${devEnvPath}`);
  rimraf.sync(devEnvPath);
}

(function () {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  removeUnnecessaryFiles();
  console.log('-> Done!');
})();
