const fs = require('fs');
const mysql = require('mysql2/promise');

const env = Object.fromEntries(
  fs.readFileSync('.env', 'utf8')
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith('#') && line.includes('='))
    .map((line) => {
      const index = line.indexOf('=');
      return [line.slice(0, index), line.slice(index + 1)];
    }),
);

async function audit() {
  const db = await mysql.createConnection({
    host: env.DATABASE_HOST,
    port: Number(env.DATABASE_PORT || 3306),
    user: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
  });

  const [roles] = await db.query(`
    SELECT r.id, r.name, r.code, COUNT(ur.user_id) AS users
    FROM admin_roles r
    LEFT JOIN admin_users_roles_lnk ur ON ur.role_id = r.id
    GROUP BY r.id, r.name, r.code
    ORDER BY r.id
  `);
  console.table(roles);

  const [permissions] = await db.query(`
    SELECT ar.name AS role_name, ap.action, ap.subject
    FROM admin_permissions ap
    JOIN admin_permissions_role_lnk pr ON pr.permission_id = ap.id
    JOIN admin_roles ar ON ar.id = pr.role_id
    WHERE ap.subject IN ('api::article.article', 'api::form-submission.form-submission', 'api::form.form')
    ORDER BY ar.name, ap.subject, ap.action
  `);
  console.table(permissions);
  await db.end();
}

audit().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
