import type { Core } from '@strapi/strapi';

const allowedMediaTypes = [
  'image/*',
  'video/*',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.*',
  'text/plain',
  'text/csv',
];

const deniedExecutableTypes = [
  'application/vnd.microsoft.portable-executable',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-executable',
  'application/x-dosexec',
  'application/x-sh',
  'text/x-shellscript',
  'application/x-mach-binary',
];

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => {
  const smtpUsername = env('SMTP_USERNAME');
  const smtpPassword = env('SMTP_PASSWORD');

  return {
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: env('SMTP_HOST', 'localhost'),
          port: env.int('SMTP_PORT', 1025),
          secure: env.bool('SMTP_SECURE', false),
          requireTLS: env.bool('SMTP_REQUIRE_TLS', false),
          ...(smtpUsername && smtpPassword
            ? { auth: { user: smtpUsername, pass: smtpPassword } }
            : {}),
        },
        settings: {
          defaultFrom: env('EMAIL_DEFAULT_FROM', smtpUsername || 'no-reply@localhost'),
          defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO', smtpUsername || 'no-reply@localhost'),
        },
      },
    },
    'users-permissions': {
      config: {
        jwtManagement: 'refresh',
        sessions: {
          httpOnly: true,
        },
      },
    },
    upload: {
      config: {
        security: {
          allowedTypes: allowedMediaTypes,
          deniedTypes: deniedExecutableTypes,
        },
      },
    },
  };
};

export default config;
