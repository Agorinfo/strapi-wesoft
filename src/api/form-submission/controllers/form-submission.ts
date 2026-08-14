import { factories, type Core } from '@strapi/strapi';

const SUBMISSION_UID = 'api::form-submission.form-submission' as const;
const FORM_UID = 'api::form.form' as const;

type NotificationForm = {
  id: number;
  name: string;
  notificationEnabled?: boolean | null;
  notificationRecipients?: string | null;
  notificationSubject?: string | null;
};

type SubmissionInput = {
  form?: number | string | { id?: number | string };
  payload?: Record<string, unknown>;
};

const escapeHtml = (value: unknown) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const parseRecipients = (value?: string | null) => Array.from(new Set(
  (value || '')
    .split(/[;,\n]/)
    .map((email) => email.trim())
    .filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
));

const getFormId = (form: SubmissionInput['form']) => {
  const rawId = typeof form === 'object' && form !== null ? form.id : form;
  const id = Number(rawId);
  return Number.isInteger(id) && id > 0 ? id : null;
};

async function setNotificationStatus(
  strapi: Core.Strapi,
  submissionId: number,
  data: Record<string, unknown>
) {
  await strapi.db.query(SUBMISSION_UID).update({ where: { id: submissionId }, data: data as never });
}

async function sendNotification(
  strapi: Core.Strapi,
  form: NotificationForm,
  submission: { documentId?: string },
  submittedAt: string
) {
  if (form.notificationEnabled === false) return 'skipped' as const;

  const recipients = parseRecipients(
    form.notificationRecipients || process.env.FORM_NOTIFICATION_DEFAULT_TO
  );
  if (recipients.length === 0) {
    strapi.log.warn(`Notification du formulaire "${form.name}" ignoree : aucun destinataire configure.`);
    return 'skipped' as const;
  }

  const subject = (form.notificationSubject || 'Nouvelle soumission — {form}')
    .replace(/\{form\}/g, form.name);
  const publicUrl = process.env.PUBLIC_URL?.replace(/\/$/, '');
  const submissionUrl = publicUrl && submission.documentId
    ? `${publicUrl}/admin/content-manager/collection-types/${SUBMISSION_UID}/${submission.documentId}`
    : null;
  const receivedAt = new Date(submittedAt).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

  await strapi.plugin('email').service('email').send({
    to: recipients,
    subject,
    text: [
      `Une nouvelle soumission a ete recue pour le formulaire "${form.name}" le ${receivedAt}.`,
      submissionUrl ? `Consulter la soumission dans Strapi : ${submissionUrl}` : 'Connectez-vous a Strapi pour la consulter.',
    ].join('\n\n'),
    html: `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#202735;">
        <div style="padding:24px;background:#004b93;color:#fff;">
          <h1 style="margin:0;font-size:22px;">${escapeHtml(subject)}</h1>
        </div>
        <div style="padding:28px;background:#f7fbff;">
          <p style="margin:0 0 12px;line-height:1.6;">Une nouvelle soumission a été reçue pour le formulaire <strong>${escapeHtml(form.name)}</strong>.</p>
          <p style="margin:0 0 24px;color:#5f6b7a;">${escapeHtml(receivedAt)}</p>
          ${submissionUrl ? `<a href="${escapeHtml(submissionUrl)}" style="display:inline-block;padding:12px 18px;border-radius:4px;background:#004b93;color:#fff;text-decoration:none;font-weight:700;">Consulter dans Strapi</a>` : '<p>Connectez-vous à Strapi pour consulter son contenu.</p>'}
        </div>
      </div>`,
  });

  return 'sent' as const;
}

export default factories.createCoreController(SUBMISSION_UID, ({ strapi }) => ({
  async create(ctx) {
    const input = (ctx.request.body as { data?: SubmissionInput } | undefined)?.data;
    const formId = getFormId(input?.form);
    const payload = input?.payload;

    if (!formId || !payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return ctx.badRequest('Formulaire ou données de soumission invalides.');
    }

    const form = await strapi.db.query(FORM_UID).findOne({ where: { id: formId } }) as unknown as NotificationForm | null;
    if (!form) return ctx.notFound('Formulaire introuvable.');

    const submittedAt = new Date().toISOString();
    ctx.request.body = {
      data: {
        form: form.id,
        formName: form.name,
        payload,
        status: 'new',
        submittedAt,
        notificationStatus: 'pending',
      },
    };

    const response = await super.create(ctx);
    const submission = response?.data as {
      id?: number;
      documentId?: string;
      notificationStatus?: string;
    } | undefined;

    if (!submission?.id) return response;

    try {
      const notificationStatus = await sendNotification(strapi, form, submission, submittedAt);
      await setNotificationStatus(strapi, submission.id, {
        notificationStatus,
        notificationSentAt: notificationStatus === 'sent' ? new Date().toISOString() : null,
        notificationError: null,
      });
      submission.notificationStatus = notificationStatus;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      strapi.log.error(`Echec de notification pour la soumission ${submission.id}: ${message}`);
      await setNotificationStatus(strapi, submission.id, {
        notificationStatus: 'failed',
        notificationError: message.slice(0, 1000),
      });
      submission.notificationStatus = 'failed';
    }

    return response;
  },
}));
