const fs = require('node:fs');
const path = require('node:path');
const { createStrapi } = require('@strapi/core');

const TOKEN_NAME = 'WeSoft Frontend';
const TOKEN_PERMISSIONS = [
  'api::page.page.find',
  'api::page.page.findOne',
  'api::site-config.site-config.find',
  'api::article.article.find',
  'api::article.article.findOne',
  'api::form.form.find',
  'api::form.form.findOne',
  'api::form-submission.form-submission.create',
];

function upsertEnvironmentValue(source, key, value) {
  const line = `${key}=${value}`;
  const pattern = new RegExp(`^${key}=.*$`, 'm');

  if (pattern.test(source)) return source.replace(pattern, line);
  return `${source.trimEnd()}${source.trim() ? '\n' : ''}${line}\n`;
}

async function main() {
  const frontendEnvironmentPath = path.resolve(
    process.argv[2] || path.join(process.cwd(), '..', 'wesoft', '.env.local'),
  );
  const app = await createStrapi({
    appDir: process.cwd(),
    distDir: path.join(process.cwd(), 'dist'),
  }).load();

  try {
    const tokenService = app.service('admin::api-token-content-api');
    let token = await tokenService.getByName(TOKEN_NAME, { includeDecryptedKey: true });

    if (!token) {
      token = await tokenService.create({
        name: TOKEN_NAME,
        description: 'Jeton serveur utilise par le frontend Next.js WeSoft',
        type: 'custom',
        lifespan: null,
        permissions: TOKEN_PERMISSIONS,
      });
    }

    if (!token.accessKey) {
      throw new Error(`Impossible de recuperer la cle du jeton ${TOKEN_NAME}.`);
    }

    const currentEnvironment = fs.existsSync(frontendEnvironmentPath)
      ? fs.readFileSync(frontendEnvironmentPath, 'utf8')
      : '';
    let nextEnvironment = upsertEnvironmentValue(
      currentEnvironment,
      'NEXT_PUBLIC_STRAPI_URL',
      process.env.STRAPI_PUBLIC_URL || 'http://localhost:1337',
    );
    nextEnvironment = upsertEnvironmentValue(nextEnvironment, 'STRAPI_API_TOKEN', token.accessKey);

    fs.mkdirSync(path.dirname(frontendEnvironmentPath), { recursive: true });
    fs.writeFileSync(frontendEnvironmentPath, nextEnvironment, { encoding: 'utf8', mode: 0o600 });
    console.log(`Configuration frontend mise a jour : ${frontendEnvironmentPath}`);
  } finally {
    await app.destroy();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
