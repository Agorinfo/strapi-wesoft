'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { createStrapi } = require('@strapi/strapi');

async function start() {
  const appDir = __dirname;
  const distDir = path.join(appDir, 'dist');
  const compiledEntry = path.join(distDir, 'src', 'index.js');

  if (!fs.existsSync(compiledEntry)) {
    throw new Error(
      'Application Strapi compilee introuvable dans dist/. Executez "npm run build" avant de redemarrer Passenger.'
    );
  }

  await createStrapi({ appDir, distDir }).start();
}

start().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
