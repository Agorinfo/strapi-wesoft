import type { Core } from '@strapi/strapi';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { registerIconPicker } from './icon-picker/server';
import { importedArticles, type ImportedArticle } from './data/imported-articles';

const softwareShowcase = {
  __component: 'sections.software-showcase',
  title: 'Une expertise sectorielle verticale',
  text: 'Nos logiciels répondent aux besoins spécifiques de métiers exigeants, avec une connaissance fine de chaque secteur.',
  background: 'white',
  items: [
    { name: 'Agorinfo', sector: 'Agriculture', description: 'Digitalisation des exploitations, traçabilité et gestion des entreprises agricoles et agroalimentaires.', accentColor: '#7a2d9f', button: { label: 'Visiter leur site', href: 'https://www.agorinfo.fr', linkType: 'external', style: 'primary', openInNewTab: true }, capabilities: [{ text: 'ERP pour les libres services agricoles' }, { text: 'ERP pour les coopératives de céréales' }, { text: 'ERP pour les métiers de la viande' }] },
    { name: 'Edilogic', sector: 'Location & BTP', description: 'Des solutions éprouvées pour le négoce et la location d’équipements et engins du BTP.', accentColor: '#f28c00', button: { label: 'Visiter leur site', href: 'https://www.edilogic.fr', linkType: 'external', style: 'primary', openInNewTab: true }, capabilities: [{ text: 'ERP pour le négoce et la location d’équipements' }, { text: 'ERP pour le négoce de matériaux' }] },
    { name: 'WeNégoce', sector: 'Négoce', description: 'Des logiciels conçus pour piloter les activités de négoce et accélérer leur transformation.', accentColor: '#56a33a', button: { label: 'Visiter leur site', href: 'https://www.wenegoce.fr', linkType: 'external', style: 'primary', openInNewTab: true }, capabilities: [{ text: 'ERP pour les négoces spécialisés' }, { text: 'Outils de mobilité et de relation client' }] },
  ],
};

const testimonialMetrics = {
  __component: 'sections.testimonial-metrics',
  background: 'blue',
  testimonials: [
    {
      quote: 'Rejoindre WeSoft a été le catalyseur dont nous avions besoin. Nous avons gardé notre expertise métier tout en bénéficiant d’une force de frappe technologique mondiale.',
      author: 'Jean-Marc Lemoine',
      role: 'Fondateur de AgriTech Solutions',
      metrics: [{ value: '15+', label: 'Logiciels intégrés' }, { value: '450+', label: 'Collaborateurs experts' }, { value: '92%', label: 'Taux de rétention clients' }, { value: '24M€', label: 'Investissement R&D annuel' }],
    },
    {
      quote: 'WeSoft nous a permis de structurer notre croissance internationale tout en maintenant une cohésion d’équipe exceptionnelle.',
      author: 'Sophie Marchand',
      role: 'DSI de MediConnect',
      metrics: [{ value: '12', label: 'Pays accompagnés' }, { value: '98%', label: 'Satisfaction des équipes' }, { value: '3x', label: 'Croissance internationale' }, { value: '24/7', label: 'Support mutualisé' }],
    },
    {
      quote: 'Grâce à l’intégration WeSoft, nous avons réduit nos délais de mise en marché de 40 %.',
      author: 'Thomas Renard',
      role: 'CEO de FinTech Innov',
      metrics: [{ value: '-40%', label: 'Délai de mise en marché' }, { value: '2x', label: 'Capacité de déploiement' }],
    },
  ],
};

const teamSection = {
  __component: 'sections.team',
  anchorId: 'equipe',
  title: 'Qui sommes-nous ?',
  text: 'WeSoft est une structure légère qui privilégie la simplicité dictée par le pragmatisme. Cette simplicité est le reflet des profils complémentaires de ses associés.',
  background: 'white',
  members: [
    { name: 'Jean-Marc Valet', role: 'PRÉSIDENT FONDATEUR', biography: 'Après avoir débuté sa carrière dans la finance, Jean-Marc accompagne depuis de nombreuses années la croissance d’éditeurs de logiciels métiers.' },
    { name: 'Jérôme Martin', role: 'DIRECTEUR GÉNÉRAL', biography: 'Après avoir dirigé des équipes commerciales B2B spécialisées IT et financement, Jérôme a piloté pendant dix ans des éditeurs de logiciels verticaux.' },
  ],
};

const contactFormFields = [
  { name: 'firstName', label: 'Prénom', type: 'text', placeholder: 'Jean', required: true, width: 'half' },
  { name: 'lastName', label: 'Nom', type: 'text', placeholder: 'Dupont', required: true, width: 'half' },
  { name: 'email', label: 'Email professionnel', type: 'email', placeholder: 'j.dupont@societe.fr', required: true, width: 'half' },
  { name: 'company', label: 'Société / Logiciel', type: 'text', placeholder: 'Nom de votre structure', width: 'half' },
  {
    name: 'sector',
    label: 'Votre secteur d’activité',
    type: 'select',
    placeholder: 'Sélectionnez un secteur',
    width: 'full',
    options: [
      { label: 'Agriculture', value: 'agriculture' },
      { label: 'BTP / Location', value: 'btp' },
      { label: 'Négoce', value: 'negoce' },
      { label: 'Autre', value: 'autre' },
    ],
  },
  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Parlez-nous de votre projet ou de votre solution…', required: true, width: 'full' },
  { name: 'consent', label: 'J’accepte que WeSoft traite mes données pour répondre à ma demande.', type: 'checkbox', required: true, width: 'full' },
];

const home = {
  title: 'Accueil', slug: 'accueil', pageType: 'home',
  excerpt: 'WeSoft accompagne les éditeurs de logiciels verticaux dans leur croissance.',
  seo: { metaTitle: 'WeSoft | Éditeurs de logiciels verticaux', metaDescription: 'WeSoft fédère des éditeurs reconnus et leur apporte un nouveau souffle commercial, technologique et humain.' },
  blocks: [
    { __component: 'sections.hero', eyebrow: 'GROUPE D’ÉDITION LOGICIELLE', title: 'Nous accompagnons les éditeurs de logiciels verticaux dans leur croissance.', text: 'L’expertise métier est le facteur essentiel de toute solution informatique. Nous apportons l’innovation technologique et l’accompagnement humain pour propulser votre solution.', background: 'lavender', buttons: [{ label: 'Découvrir nos solutions', style: 'primary', linkType: 'internal', href: '/#solutions' }, { label: 'Qui sommes-nous ?', style: 'secondary', linkType: 'internal', href: '/#equipe' }] },
    { __component: 'sections.feature-grid', anchorId: 'solutions', eyebrow: 'NOTRE APPROCHE', title: 'Nos 4 piliers stratégiques', text: 'Une approche intégrée pour garantir le succès de votre transition numérique et métier.', background: 'white', features: [{ title: 'Expertise métier', text: 'Une compréhension profonde des enjeux quotidiens pour une réponse logicielle pertinente.' }, { title: 'Innovation technologique', text: 'Une technologie qui apporte un bénéfice métier réel. Pas de technologie pour la technologie.' }, { title: 'Accompagnement', text: 'Renforcer la satisfaction client en s’appuyant sur l’énergie des équipes en place.' }, { title: 'Nouveau souffle', text: 'Continuer à écrire l’histoire de votre solution dans le périmètre dynamique de WeSoft.' }] },
    { __component: 'sections.process', anchorId: 'processus', eyebrow: 'TRANSMISSION', title: 'Un processus d’acquisition serein et structuré', text: 'Nous privilégions la continuité opérationnelle et le respect de votre ADN historique.', background: 'sky', steps: [{ title: 'Diagnostic stratégique', text: 'Analyse de votre produit, de votre marché et de votre potentiel.' }, { title: 'Valorisation & offre', text: 'Une proposition transparente basée sur une vision de long terme.' }, { title: 'Intégration douce', text: 'Des synergies groupe tout en préservant l’autonomie des équipes.' }, { title: 'Accélération', text: 'Déploiement du plan de croissance, de la R&D et du marketing.' }] },
    softwareShowcase,
    { __component: 'sections.business-characteristics', eyebrow: 'ÉDITEURS', title: 'Vos caractéristiques métiers', text: 'Nous cherchons à acquérir des éditeurs de logiciels verticaux avec des critères de performance et d’humain élevés.', background: 'sky', button: { label: 'Contactez-nous', style: 'secondary', linkType: 'internal', href: '/contact' }, cards: [{ title: 'Savoir-faire reconnu', text: 'Une expertise métier forte et un savoir-faire validé par vos clients et votre marché sectoriel.', backgroundColor: '#004b93', colSpan: 5 }, { title: '0,5 - 3M€', text: 'Chiffre d’affaires annuel avec une part significative de revenu récurrent.', backgroundColor: '#dce6ff', colSpan: 3 }, { title: 'Fidélité client', text: 'Une forte satisfaction clients qui témoigne de leur attachement indéfectible.', backgroundColor: '#ffffff', colSpan: 4 }, { title: 'Équipiers engagés', text: 'Des collaborateurs dévoués au service de leurs clients.', backgroundColor: '#606979', colSpan: 4 }] },
    testimonialMetrics,
    teamSection,
    { __component: 'sections.cta', title: 'Prêt à entamer un nouveau chapitre ?', text: 'Ensemble, donnons un nouveau souffle à votre solution logicielle.', background: 'blue', buttons: [{ label: 'Prendre rendez-vous', style: 'light', linkType: 'internal', href: '/contact' }] },
  ],
};

const siteConfig = {
  siteName: 'WeSoft',
  navigation: [{ label: 'Les solutions', href: '/#solutions', linkType: 'internal' }, { label: 'Le processus d’acquisition', href: '/#processus', linkType: 'internal' }, { label: 'Les ressources', href: '/articles', linkType: 'internal' }, { label: 'Qui sommes-nous ?', href: '/#equipe', linkType: 'internal' }],
  headerButton: { label: 'Contactez-nous', style: 'primary', linkType: 'internal', href: '/contact' },
  footerIntro: 'Le partenaire de référence pour l’excellence opérationnelle et la croissance des éditeurs de logiciels verticaux.',
  footerColumns: [{ title: 'Liens utiles', links: [{ label: 'Nos solutions', href: '/#solutions', linkType: 'internal' }, { label: 'Notre processus', href: '/#processus', linkType: 'internal' }, { label: 'Ressources', href: '/articles', linkType: 'internal' }] }, { title: 'Légal', links: [{ label: 'Mentions légales', href: '/mentions-legales', linkType: 'internal' }, { label: 'Politique de confidentialité', href: '/politique-de-confidentialite', linkType: 'internal' }] }],
  copyright: '© 2026 WeSoft. Tous droits réservés.',
  articleSidebarPrimaryTitle: 'Prêt pour la révolution ?',
  articleSidebarPrimaryText: 'Découvrez comment nos solutions ERP intègrent l’IA pour votre métier.',
  articleSidebarPrimaryButton: { label: 'Découvrir nos solutions', href: '/#solutions', linkType: 'internal', style: 'primary' },
  articleSidebarSecondaryTitle: 'Prêt pour la révolution ?',
  articleSidebarSecondaryText: 'Découvrez comment nos solutions ERP intègrent l’IA pour votre métier.',
  articleSidebarSecondaryButton: { label: 'Voir nos éditeurs', href: '/#solutions', linkType: 'internal', style: 'light' },
};

const secondaryPages = [
  { title: 'Mentions légales', slug: 'mentions-legales', pageType: 'legal', blocks: [{ __component: 'sections.hero', eyebrow: 'INFORMATIONS', title: 'Mentions légales', text: 'Retrouvez les informations relatives à l’éditeur du site et à ses conditions d’utilisation.', background: 'sky' }, { __component: 'sections.rich-text', eyebrow: 'INFORMATIONS', title: 'Mentions légales', content: '<p>WeSoft SAS — 218 rue de la Ronce, 76230 Isneauville. Les informations légales détaillées peuvent être complétées depuis cet écran dans Strapi.</p>', background: 'white' }] },
  { title: 'Politique de confidentialité', slug: 'politique-de-confidentialite', pageType: 'legal', blocks: [{ __component: 'sections.hero', eyebrow: 'VOS DONNÉES', title: 'Politique de confidentialité', text: 'Découvrez comment WeSoft protège vos données personnelles et les droits dont vous disposez.', background: 'sky' }, { __component: 'sections.rich-text', eyebrow: 'DONNÉES PERSONNELLES', title: 'Politique de confidentialité', content: '<p>Cette page est administrable depuis Strapi. Complétez ici les finalités, durées de conservation et modalités d’exercice des droits applicables au site.</p>', background: 'white' }] },
];

type DynamicBlock = Record<string, any> & { __component: string };

const homepageBlockPopulate = {
  blocks: {
    on: {
      'sections.hero': { populate: { image: true, buttons: true } },
      'sections.feature-grid': { populate: { features: true } },
      'sections.process': { populate: { steps: true } },
      'sections.business-characteristics': { populate: { cards: true, button: true } },
      'sections.metrics': { populate: { metrics: true } },
      'sections.cta': { populate: { buttons: true } },
      'sections.software-showcase': {
        populate: { items: { populate: { logo: true, image: true, button: true, capabilities: true } } },
      },
      'sections.testimonial-metrics': {
        populate: { avatar: true, testimonials: { populate: { avatar: true, metrics: true } }, metrics: true },
      },
      'sections.team': { populate: { members: { populate: { photo: true } } } },
    },
  },
} as const;

const homepageAssets = {
  hero: { file: 'home-hero.png', alt: 'Interface logicielle professionnelle' },
  agorinfoLogo: { file: 'logo-agorinfo.png', alt: 'Agorinfo' },
  agorinfoImage: { file: 'software-agorinfo.png', alt: 'Solution Agorinfo' },
  edilogicLogo: { file: 'logo-edilogic.png', alt: 'Edilogic' },
  wenegoceLogo: { file: 'logo-wenegoce.png', alt: 'WeNégoce' },
  wenegoceImage: { file: 'software-wenegoce.png', alt: 'Solution WeNégoce' },
  testimonial: { file: 'testimonial-avatar.png', alt: 'Jean-Marc Lemoine' },
  team: { file: 'team-jean-marc.png', alt: 'Équipe WeSoft' },
} as const;

async function ensureUpload(strapi: Core.Strapi, filename: string, alternativeText: string) {
  const existing = await strapi.db.query('plugin::upload.file').findOne({ where: { name: filename } });
  if (existing) return existing.id;

  const filepath = path.resolve(process.cwd(), '..', 'wesoft', 'public', 'images', filename);
  if (!fs.existsSync(filepath)) {
    strapi.log.warn(`[homepage migration] Asset not found: ${filepath}`);
    return undefined;
  }

  const extension = path.extname(filename).toLowerCase();
  const mimetype = extension === '.svg' ? 'image/svg+xml' : extension === '.jpg' || extension === '.jpeg' ? 'image/jpeg' : 'image/png';
  const uploadService = strapi.plugin('upload').service('upload') as unknown as {
    upload(input: { data: { fileInfo: { name: string; alternativeText: string } }; files: { filepath: string; originalFilename: string; mimetype: string; size: number } }): Promise<Array<{ id: number }>>;
  };
  const uploaded = await uploadService.upload({
    data: { fileInfo: { name: filename, alternativeText } },
    files: { filepath, originalFilename: filename, mimetype, size: fs.statSync(filepath).size },
  });
  return uploaded[0]?.id;
}

async function ensureRemoteUpload(strapi: Core.Strapi, remote: ImportedArticle['remoteCover']) {
  const existing = await strapi.db.query('plugin::upload.file').findOne({ where: { name: remote.filename } });
  if (existing) return existing.id;

  let filepath: string | undefined;
  try {
    const response = await fetch(remote.url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WeSoftContentImporter/1.0)' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    filepath = path.join(os.tmpdir(), `${Date.now()}-${remote.filename}`);
    fs.writeFileSync(filepath, bytes);

    const mimetype = response.headers.get('content-type')?.split(';')[0] || 'image/png';
    const uploadService = strapi.plugin('upload').service('upload') as unknown as {
      upload(input: { data: { fileInfo: { name: string; alternativeText: string } }; files: { filepath: string; originalFilename: string; mimetype: string; size: number } }): Promise<Array<{ id: number }>>;
    };
    const uploaded = await uploadService.upload({
      data: { fileInfo: { name: remote.filename, alternativeText: remote.alternativeText } },
      files: { filepath, originalFilename: remote.filename, mimetype, size: bytes.length },
    });
    return uploaded[0]?.id;
  } catch (error) {
    strapi.log.warn(`[article migration] Unable to import ${remote.url}: ${error instanceof Error ? error.message : String(error)}`);
    return undefined;
  } finally {
    if (filepath && fs.existsSync(filepath)) fs.unlinkSync(filepath);
  }
}

function prepareForDocumentUpdate(value: any): any {
  if (Array.isArray(value)) return value.map(prepareForDocumentUpdate);
  if (!value || typeof value !== 'object') return value;

  // Populated media relations must be written back as relation ids. Component
  // ids, on the other hand, belong to the published entry and must not be
  // reused when Strapi rebuilds the dynamic zone.
  if (value.id && (value.mime || value.provider || value.url?.startsWith('/uploads/'))) return value.id;

  return Object.fromEntries(Object.entries(value)
    .filter(([key]) => !['id', 'documentId', 'createdAt', 'updatedAt', 'publishedAt', 'locale'].includes(key))
    .map(([key, nested]) => [key, prepareForDocumentUpdate(nested)]));
}

type TiptapNode = Record<string, unknown> & { type: string; content?: TiptapNode[] };

function decodeHtml(value: string) {
  return value.replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&quot;/gi, '"').replace(/&#39;/gi, "'");
}

function inlineTiptapNodes(value: string): TiptapNode[] {
  const marks: Array<Record<string, unknown>> = [];
  const nodes: TiptapNode[] = [];
  const tokens = value.match(/<[^>]+>|[^<]+/g) || [];

  for (const token of tokens) {
    if (!token.startsWith('<')) {
      const text = decodeHtml(token.replace(/\s+/g, ' '));
      if (text) nodes.push({ type: 'text', text, ...(marks.length ? { marks: structuredClone(marks) } : {}) });
      continue;
    }
    const closing = /^<\//.test(token);
    const name = token.match(/^<\/?\s*([\w-]+)/)?.[1]?.toLowerCase();
    if (!name) continue;
    if (name === 'br') {
      nodes.push({ type: 'hardBreak' });
      continue;
    }
    if (closing) {
      const index = [...marks].map((mark) => mark.type).lastIndexOf(name === 'b' ? 'bold' : name === 'i' ? 'italic' : name);
      if (index >= 0) marks.splice(index, 1);
      continue;
    }
    if (name === 'strong' || name === 'b') marks.push({ type: 'bold' });
    if (name === 'em' || name === 'i') marks.push({ type: 'italic' });
    if (name === 'u') marks.push({ type: 'underline' });
    if (name === 's' || name === 'strike' || name === 'del') marks.push({ type: 'strike' });
    if (name === 'code') marks.push({ type: 'code' });
    if (name === 'a') {
      const href = token.match(/href\s*=\s*["']([^"']+)["']/i)?.[1];
      const target = token.match(/target\s*=\s*["']([^"']+)["']/i)?.[1];
      marks.push({ type: 'link', attrs: { ...(href ? { href: decodeHtml(href) } : {}), ...(target ? { target } : {}) } });
    }
  }
  return nodes;
}

function htmlToTiptap(value: string) {
  try {
    const parsed = JSON.parse(value);
    if (parsed?.type === 'doc') return value;
  } catch {
    // Legacy HTML is converted below.
  }

  const blocks: TiptapNode[] = [];
  const blockPattern = /<(h[1-6]|p|blockquote|ul|ol|pre)(?:\s[^>]*)?>([\s\S]*?)<\/\1>|<hr\s*\/?\s*>/gi;
  let cursor = 0;
  let match: RegExpExecArray | null;
  const addParagraph = (html: string) => {
    const content = inlineTiptapNodes(html.replace(/<\/?p[^>]*>/gi, ''));
    if (content.length) blocks.push({ type: 'paragraph', content });
  };

  while ((match = blockPattern.exec(value))) {
    const before = value.slice(cursor, match.index).replace(/<[^>]+>/g, '').trim();
    if (before) addParagraph(before);
    cursor = blockPattern.lastIndex;
    const tag = match[1]?.toLowerCase();
    const inner = match[2] || '';
    if (!tag) {
      blocks.push({ type: 'horizontalRule' });
      continue;
    }
    if (/^h[1-6]$/.test(tag)) {
      blocks.push({ type: 'heading', attrs: { level: Number(tag.slice(1)) }, content: inlineTiptapNodes(inner) });
      continue;
    }
    if (tag === 'p') {
      addParagraph(inner);
      continue;
    }
    if (tag === 'blockquote') {
      const quotedParagraphs = [...inner.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gi)].map((item) => ({ type: 'paragraph', content: inlineTiptapNodes(item[1]) }));
      blocks.push({ type: 'blockquote', content: quotedParagraphs.length ? quotedParagraphs : [{ type: 'paragraph', content: inlineTiptapNodes(inner) }] });
      continue;
    }
    if (tag === 'ul' || tag === 'ol') {
      const items = [...inner.matchAll(/<li(?:\s[^>]*)?>([\s\S]*?)<\/li>/gi)].map((item) => ({ type: 'listItem', content: [{ type: 'paragraph', content: inlineTiptapNodes(item[1].replace(/<\/?p[^>]*>/gi, '')) }] }));
      blocks.push({ type: tag === 'ul' ? 'bulletList' : 'orderedList', content: items });
      continue;
    }
    if (tag === 'pre') blocks.push({ type: 'codeBlock', content: inlineTiptapNodes(inner.replace(/<\/?code[^>]*>/gi, '')) });
  }
  const trailing = value.slice(cursor).replace(/<[^>]+>/g, '').trim();
  if (trailing) addParagraph(trailing);
  return JSON.stringify({ type: 'doc', content: blocks.length ? blocks : [{ type: 'paragraph' }] });
}

async function migrateRichTextToTiptap(strapi: Core.Strapi) {
  const migrationStore = strapi.store({ type: 'plugin', name: 'wesoft', key: 'tiptap-content-v1' });
  if (await migrationStore.get()) return;

  const targets = ['articles', 'components_sections_rich_texts', 'components_shared_legal_sections'];
  let migrated = 0;
  for (const table of targets) {
    const entries = await strapi.db.connection(table).select('id', 'content') as Array<{ id: number; content?: unknown }>;
    for (const entry of entries as Array<{ id: number; content?: unknown }>) {
      if (typeof entry.content !== 'string' || !entry.content.trim()) continue;
      const converted = htmlToTiptap(entry.content);
      if (converted === entry.content) continue;
      await strapi.db.connection(table).where({ id: entry.id }).update({ content: converted });
      migrated += 1;
    }
  }

  await migrationStore.set({ value: { completedAt: new Date().toISOString(), migrated } });
  strapi.log.info(`[tiptap migration] ${migrated} rich-text field(s) converted without deleting their content.`);
}

async function migrateHomepageToBackOffice(strapi: Core.Strapi) {
  const migrationStore = strapi.store({ type: 'plugin', name: 'wesoft', key: 'homepage-sections-v1' });
  if (await migrationStore.get()) return;

  const page = await strapi.documents('api::page.page').findFirst({
    filters: { slug: 'accueil' },
    status: 'published',
    populate: homepageBlockPopulate,
  } as never) as unknown as { documentId: string; blocks?: DynamicBlock[] } | null;

  if (!page) return;

  const mediaEntries = await Promise.all(Object.entries(homepageAssets).map(async ([key, asset]) => [key, await ensureUpload(strapi, asset.file, asset.alt)] as const));
  const media = Object.fromEntries(mediaEntries) as Record<keyof typeof homepageAssets, number | undefined>;
  const blocks = prepareForDocumentUpdate(page.blocks || []) as DynamicBlock[];

  const hero = blocks.find((block) => block.__component === 'sections.hero');
  if (hero && !hero.image && media.hero) hero.image = media.hero;

  if (!blocks.some((block) => block.__component === 'sections.software-showcase')) {
    const section = structuredClone(softwareShowcase) as DynamicBlock;
    section.items[0].logo = media.agorinfoLogo;
    section.items[0].image = media.agorinfoImage;
    section.items[1].logo = media.edilogicLogo;
    section.items[1].image = media.agorinfoImage;
    section.items[2].logo = media.wenegoceLogo;
    section.items[2].image = media.wenegoceImage;
    const processIndex = blocks.findIndex((block) => block.__component === 'sections.process');
    blocks.splice(processIndex >= 0 ? processIndex + 1 : blocks.length, 0, section);
  }

  if (!blocks.some((block) => block.__component === 'sections.testimonial-metrics')) {
    const legacyMetricsIndex = blocks.findIndex((block) => block.__component === 'sections.metrics');
    const legacyMetrics = legacyMetricsIndex >= 0 ? blocks[legacyMetricsIndex].metrics : undefined;
    const section = structuredClone(testimonialMetrics) as DynamicBlock;
    if (legacyMetrics?.length) section.metrics = legacyMetrics;
    if (media.testimonial) section.testimonials[0].avatar = media.testimonial;
    if (legacyMetricsIndex >= 0) blocks.splice(legacyMetricsIndex, 1, section);
    else blocks.push(section);
  }

  if (!blocks.some((block) => block.__component === 'sections.team')) {
    const section = structuredClone(teamSection) as DynamicBlock;
    if (media.team) section.members = section.members.map((member: Record<string, unknown>) => ({ ...member, photo: media.team }));
    const testimonialIndex = blocks.findIndex((block) => block.__component === 'sections.testimonial-metrics');
    blocks.splice(testimonialIndex >= 0 ? testimonialIndex + 1 : blocks.length, 0, section);
  }

  await strapi.documents('api::page.page').update({ documentId: page.documentId, data: { blocks } as never, status: 'published' });
  await migrationStore.set({ value: { completedAt: new Date().toISOString() } });
  strapi.log.info('[homepage migration] Software, testimonials and team sections are now managed by Strapi.');
}

async function migrateWhoWeAreToHomepageAnchor(strapi: Core.Strapi) {
  const migrationStore = strapi.store({ type: 'plugin', name: 'wesoft', key: 'who-we-are-anchor-v1' });
  if (await migrationStore.get()) return;

  const config = await strapi.documents('api::site-config.site-config').findFirst({
    status: 'published',
    populate: { navigation: true },
  } as never) as unknown as { documentId: string; navigation?: Array<Record<string, any>> } | null;

  if (config?.navigation) {
    const navigation = prepareForDocumentUpdate(config.navigation).map((item: Record<string, any>) =>
      item.href === '/qui-sommes-nous' ? { ...item, href: '/#equipe' } : item,
    );
    await strapi.documents('api::site-config.site-config').update({
      documentId: config.documentId,
      data: { navigation } as never,
      status: 'published',
    });
  }

  const homepage = await strapi.documents('api::page.page').findFirst({
    filters: { slug: 'accueil' },
    status: 'published',
    populate: homepageBlockPopulate,
  } as never) as unknown as { documentId: string; blocks?: DynamicBlock[] } | null;

  if (homepage) {
    const blocks = prepareForDocumentUpdate(homepage.blocks || []) as DynamicBlock[];
    for (const block of blocks) {
      if (block.__component === 'sections.hero' && Array.isArray(block.buttons)) {
        block.buttons = block.buttons.map((button: Record<string, any>) =>
          button.href === '/qui-sommes-nous' ? { ...button, href: '/#equipe' } : button,
        );
      }
      if (block.__component === 'sections.team' && !block.anchorId) block.anchorId = 'equipe';
    }
    await strapi.documents('api::page.page').update({
      documentId: homepage.documentId,
      data: { blocks } as never,
      status: 'published',
    });
  }

  const obsoletePages = await strapi.documents('api::page.page').findMany({
    filters: { slug: 'qui-sommes-nous' },
  } as never) as unknown as Array<{ documentId: string }>;
  for (const page of obsoletePages) {
    await strapi.documents('api::page.page').delete({ documentId: page.documentId });
  }

  await migrationStore.set({ value: { completedAt: new Date().toISOString() } });
  strapi.log.info('[navigation migration] "Qui sommes-nous ?" now links to /#equipe; the obsolete page was removed.');
}

async function repairHomepageMediaRelations(strapi: Core.Strapi) {
  const migrationStore = strapi.store({ type: 'plugin', name: 'wesoft', key: 'homepage-media-repair-v2' });
  if (await migrationStore.get()) return;

  const homepage = await strapi.documents('api::page.page').findFirst({
    filters: { slug: 'accueil' },
    status: 'published',
    populate: homepageBlockPopulate,
  } as never) as unknown as { documentId: string; blocks?: DynamicBlock[] } | null;
  if (!homepage) return;

  const mediaEntries = await Promise.all(Object.entries(homepageAssets).map(async ([key, asset]) =>
    [key, await ensureUpload(strapi, asset.file, asset.alt)] as const,
  ));
  const media = Object.fromEntries(mediaEntries) as Record<keyof typeof homepageAssets, number | undefined>;
  const blocks = prepareForDocumentUpdate(homepage.blocks || []) as DynamicBlock[];

  const hero = blocks.find((block) => block.__component === 'sections.hero');
  if (hero && !hero.image && media.hero) hero.image = media.hero;

  const showcase = blocks.find((block) => block.__component === 'sections.software-showcase');
  if (showcase && Array.isArray(showcase.items)) {
    const showcaseMedia = [
      { logo: media.agorinfoLogo, image: media.agorinfoImage },
      { logo: media.edilogicLogo, image: media.agorinfoImage },
      { logo: media.wenegoceLogo, image: media.wenegoceImage },
    ];
    showcase.items = showcase.items.map((item: Record<string, any>, index: number) => ({
      ...item,
      logo: item.logo || showcaseMedia[index]?.logo,
      image: item.image || showcaseMedia[index]?.image,
      button: item.button || softwareShowcase.items[index]?.button,
      capabilities: item.capabilities?.length ? item.capabilities : softwareShowcase.items[index]?.capabilities,
    }));
  }

  const testimonials = blocks.find((block) => block.__component === 'sections.testimonial-metrics');
  if (testimonials && Array.isArray(testimonials.testimonials) && media.testimonial) {
    testimonials.testimonials = testimonials.testimonials.map((testimonial: Record<string, any>, index: number) =>
      index === 0 && !testimonial.avatar ? { ...testimonial, avatar: media.testimonial } : testimonial,
    );
  }

  const team = blocks.find((block) => block.__component === 'sections.team');
  if (team && Array.isArray(team.members) && media.team) {
    team.members = team.members.map((member: Record<string, any>) =>
      member.photo ? member : { ...member, photo: media.team },
    );
  }

  await strapi.documents('api::page.page').update({
    documentId: homepage.documentId,
    data: { blocks } as never,
    status: 'published',
  });
  await migrationStore.set({ value: { completedAt: new Date().toISOString() } });
  strapi.log.info('[homepage migration] Missing homepage media relations were restored.');
}

async function migrateTestimonialMetricsToSlides(strapi: Core.Strapi) {
  const migrationStore = strapi.store({ type: 'plugin', name: 'wesoft', key: 'testimonial-metrics-per-slide-v1' });
  if (await migrationStore.get()) return;

  const homepage = await strapi.documents('api::page.page').findFirst({
    filters: { slug: 'accueil' },
    status: 'published',
    populate: homepageBlockPopulate,
  } as never) as unknown as { documentId: string; blocks?: DynamicBlock[] } | null;

  if (!homepage) return;

  const blocks = prepareForDocumentUpdate(homepage.blocks || []) as DynamicBlock[];
  let migratedTestimonials = 0;

  for (const block of blocks) {
    if (block.__component !== 'sections.testimonial-metrics' || !Array.isArray(block.testimonials)) continue;

    const legacyMetrics = Array.isArray(block.metrics) ? block.metrics : [];
    if (legacyMetrics.length === 0) continue;

    block.testimonials = block.testimonials.map((testimonial: Record<string, any>) => {
      if (Array.isArray(testimonial.metrics) && testimonial.metrics.length > 0) return testimonial;
      migratedTestimonials += 1;
      return { ...testimonial, metrics: structuredClone(legacyMetrics) };
    });
  }

  if (migratedTestimonials > 0) {
    await strapi.documents('api::page.page').update({
      documentId: homepage.documentId,
      data: { blocks } as never,
      status: 'published',
    });
  }

  await migrationStore.set({ value: { completedAt: new Date().toISOString(), migratedTestimonials } });
  strapi.log.info(`[testimonial migration] ${migratedTestimonials} testimonial slide(s) now own their metrics.`);
}

async function migrateBusinessCharacteristicsSpans(strapi: Core.Strapi) {
  const migrationStore = strapi.store({ type: 'plugin', name: 'wesoft', key: 'business-characteristics-col-spans-v2' });
  if (await migrationStore.get()) return;

  const homepage = await strapi.documents('api::page.page').findFirst({
    filters: { slug: 'accueil' },
    status: 'published',
    populate: homepageBlockPopulate,
  } as never) as unknown as { documentId: string; blocks?: DynamicBlock[] } | null;
  if (!homepage) return;

  const blocks = prepareForDocumentUpdate(homepage.blocks || []) as DynamicBlock[];
  const defaultSpans = [5, 3, 4, 4];
  let updatedCards = 0;

  for (const block of blocks) {
    if (block.__component !== 'sections.business-characteristics' || !Array.isArray(block.cards)) continue;
    const hasOnlyDefaultSpans = block.cards.every((card: Record<string, any>) => card.colSpan === 4);
    block.cards = block.cards.map((card: Record<string, any>, index: number) => {
      if (!hasOnlyDefaultSpans && Number.isInteger(card.colSpan) && card.colSpan >= 1 && card.colSpan <= 8) return card;
      updatedCards += 1;
      return { ...card, colSpan: defaultSpans[index] || 4 };
    });
  }

  if (updatedCards > 0) {
    await strapi.documents('api::page.page').update({
      documentId: homepage.documentId,
      data: { blocks } as never,
      status: 'published',
    });
  }

  await migrationStore.set({ value: { completedAt: new Date().toISOString(), updatedCards } });
  strapi.log.info(`[business characteristics migration] ${updatedCards} card span(s) initialized.`);
}

async function grantArticlePublishingToAuthors(strapi: Core.Strapi) {
  const migrationStore = strapi.store({ type: 'plugin', name: 'wesoft', key: 'author-article-publish-v1' });
  if (await migrationStore.get()) return;

  const connection = strapi.db.connection;
  const authorRole = await connection('admin_roles')
    .select('id')
    .where({ code: 'strapi-author' })
    .first();
  const publishPermission = await connection('admin_permissions')
    .select('id')
    .where({
      action: 'plugin::content-manager.explorer.publish',
      subject: 'api::article.article',
    })
    .first();

  if (!authorRole || !publishPermission) {
    strapi.log.warn('[permissions migration] Author role or article publication permission was not found.');
    return;
  }

  const existingLink = await connection('admin_permissions_role_lnk')
    .where({ role_id: authorRole.id, permission_id: publishPermission.id })
    .first();

  if (!existingLink) {
    await connection('admin_permissions_role_lnk').insert({
      role_id: authorRole.id,
      permission_id: publishPermission.id,
    });
  }

  await migrationStore.set({ value: { completedAt: new Date().toISOString() } });
  strapi.log.info('[permissions migration] The Author role can now publish articles.');
}

async function migrateContactPageToFullSection(strapi: Core.Strapi) {
  const migrationStore = strapi.store({ type: 'plugin', name: 'wesoft', key: 'contact-page-full-section-v1' });
  if (await migrationStore.get()) return;

  const contactForm = await strapi.documents('api::form.form').findFirst({
    filters: { slug: 'contact' },
    status: 'published',
    populate: { fields: true },
  } as never) as unknown as { documentId: string; fields?: Array<{ name?: string }> } | null;

  if (!contactForm) return;

  const legacyFieldNames = ['name', 'email', 'company', 'message'];
  const currentFieldNames = (contactForm.fields || []).map((field) => field.name).filter(Boolean);
  if (currentFieldNames.length === legacyFieldNames.length && currentFieldNames.every((name, index) => name === legacyFieldNames[index])) {
    await strapi.documents('api::form.form').update({
      documentId: contactForm.documentId,
      data: {
        title: 'Parlons de votre projet',
        description: 'Vous dirigez un éditeur ou souhaitez échanger avec WeSoft ? Présentez-nous votre projet.',
        submitLabel: 'Envoyer le message',
        fields: contactFormFields,
      } as never,
      status: 'published',
    });
  }

  const contactPage = await strapi.documents('api::page.page').findFirst({
    filters: { slug: 'contact' },
    status: 'published',
    populate: { blocks: true },
  } as never) as unknown as { documentId: string; blocks?: DynamicBlock[] } | null;

  if (!contactPage) return;

  const blocks = prepareForDocumentUpdate(contactPage.blocks || []) as DynamicBlock[];
  const hasFullContactSection = blocks.some((block) => block.__component === 'sections.contact');
  const nextBlocks = hasFullContactSection ? blocks : blocks.map((block) => {
    if (block.__component !== 'sections.form-section') return block;
    return {
      __component: 'sections.contact',
      title: 'Parlons de votre projet',
      officeTitle: 'Le siège',
      officeName: 'WeSoft',
      address: '218 rue de la Ronce\n76230 Isneauville',
      socialTitle: 'Suivez-nous',
      socialText: 'Découvrez les actualités du groupe et de ses éditeurs.',
      socialLabel: 'LinkedIn',
      socialHref: 'https://www.linkedin.com/company/wesoft/',
      form: contactForm.documentId,
      background: 'sky',
    };
  });

  if (!hasFullContactSection) {
    await strapi.documents('api::page.page').update({
      documentId: contactPage.documentId,
      data: { blocks: nextBlocks } as never,
      status: 'published',
    });
  }

  await migrationStore.set({ value: { completedAt: new Date().toISOString() } });
  strapi.log.info('[contact migration] The contact page now uses the full design section and form.');
}

async function addTiltedPageHeroes(strapi: Core.Strapi) {
  const migrationStore = strapi.store({ type: 'plugin', name: 'wesoft', key: 'contact-and-resources-tilted-heroes-v3' });
  if (await migrationStore.get()) return;

  const contactImage = await ensureUpload(strapi, 'contact-office.png', 'Bureaux WeSoft');
  const resourcesImage = await ensureUpload(strapi, 'resources-hero.png', 'Actualités et ressources WeSoft');
  const pagePopulate = {
    blocks: {
      on: {
        'sections.hero': { populate: { image: true, buttons: true } },
        'sections.article-list': { populate: '*' },
        'sections.contact': { populate: '*' },
        'sections.cta': { populate: { buttons: true } },
      },
    },
  };

  const contactPage = await strapi.documents('api::page.page').findFirst({
    filters: { slug: 'contact' }, status: 'published', populate: pagePopulate,
  } as never) as unknown as { documentId: string; blocks?: DynamicBlock[] } | null;

  if (contactPage) {
    const blocks = prepareForDocumentUpdate(contactPage.blocks || []) as DynamicBlock[];
    const hero = blocks.find((block) => block.__component === 'sections.hero');
    if (hero) {
      hero.imageTilt = true;
      hero.imageTiltSize = 'large';
      if (!hero.image && contactImage) hero.image = contactImage;
    } else {
      blocks.unshift({
        __component: 'sections.hero',
        eyebrow: 'REJOIGNEZ-NOUS',
        title: 'Entrons en contact !',
        text: 'Vous êtes un éditeur de logiciel métier et vous souhaitez accélérer votre croissance au sein d’un écosystème d’experts ? Échangeons sur vos ambitions et l’avenir de votre solution.',
        image: contactImage,
        imageTilt: true,
        imageTiltSize: 'large',
        showDecoration: false,
        background: 'sky',
      });
    }
    await strapi.documents('api::page.page').update({
      documentId: contactPage.documentId,
      data: { blocks } as never,
      status: 'published',
    });
  }

  const resourcesPage = await strapi.documents('api::page.page').findFirst({
    filters: { slug: 'articles' }, status: 'published', populate: pagePopulate,
  } as never) as unknown as { documentId: string; blocks?: DynamicBlock[] } | null;

  if (resourcesPage) {
    const blocks = prepareForDocumentUpdate(resourcesPage.blocks || []) as DynamicBlock[];
    const hero = blocks.find((block) => block.__component === 'sections.hero');
    if (hero) {
      hero.imageTilt = true;
      hero.imageTiltSize = 'large';
      if (!hero.image && resourcesImage) hero.image = resourcesImage;
      await strapi.documents('api::page.page').update({
        documentId: resourcesPage.documentId,
        data: { blocks } as never,
        status: 'published',
      });
    }
  }

  await migrationStore.set({ value: { completedAt: new Date().toISOString() } });
  strapi.log.info('[page migration] Contact and Resources heroes now use tilted images.');
}

async function restoreContactFormRelation(strapi: Core.Strapi) {
  const migrationStore = strapi.store({ type: 'plugin', name: 'wesoft', key: 'contact-form-relation-v1' });
  if (await migrationStore.get()) return;

  const form = await strapi.documents('api::form.form').findFirst({
    filters: { slug: 'contact' },
    status: 'published',
  } as never) as unknown as { documentId: string } | null;
  const page = await strapi.documents('api::page.page').findFirst({
    filters: { slug: 'contact' },
    status: 'published',
    populate: {
      blocks: {
        on: {
          'sections.hero': { populate: { image: true, buttons: true } },
          'sections.contact': { populate: { form: true } },
        },
      },
    },
  } as never) as unknown as { documentId: string; blocks?: DynamicBlock[] } | null;

  if (form && page) {
    const blocks = prepareForDocumentUpdate(page.blocks || []) as DynamicBlock[];
    const contactBlock = blocks.find((block) => block.__component === 'sections.contact');
    if (contactBlock && !contactBlock.form) {
      contactBlock.form = form.documentId;
      await strapi.documents('api::page.page').update({
        documentId: page.documentId,
        data: { blocks } as never,
        status: 'published',
      });
      strapi.log.info('[contact migration] Contact form relation restored.');
    }
  }

  await migrationStore.set({ value: { completedAt: new Date().toISOString() } });
}

const defaultLegalSections: Record<string, Array<Record<string, string>>> = {
  'mentions-legales': [
    { anchorId: 'editeur', title: '1. Éditeur du Site', content: '<p><strong>Raison Sociale :</strong> WeSoft SAS</p><p><strong>Forme juridique :</strong> Société par Actions Simplifiée (SAS)</p><p><strong>Capital Social :</strong> 200 000 €</p><p><strong>Siège Social :</strong> 218 Rue de la Ronce, 76230 Isneauville, France</p><p><strong>Contact :</strong> contact@wesoft.group</p>' },
    { anchorId: 'publication', title: '2. Directeur de la Publication', content: '<p>Le directeur de la publication du site WeSoft est Monsieur Jérôme Martin, en sa qualité de Président de WeSoft SAS.</p>' },
    { anchorId: 'hebergement', title: '3. Hébergement du Site', content: '<p>Le site WeSoft est hébergé par Amazon Web Services (AWS). Les données sont stockées exclusivement sur des serveurs situés en Union Européenne.</p>' },
    { anchorId: 'propriete', title: '4. Propriété Intellectuelle', content: '<p>L’ensemble du contenu présent sur ce site est la propriété intellectuelle exclusive de WeSoft SAS ou de ses partenaires et est protégé par les lois internationales.</p>' },
    { anchorId: 'responsabilite', title: '5. Limitation de Responsabilité', content: '<p>WeSoft SAS s’efforce de fournir des informations aussi précises que possible. Le site peut contenir des liens hypertextes vers d’autres sites dont WeSoft ne pourra être tenue responsable.</p>' },
  ],
  'politique-de-confidentialite': [
    { anchorId: 'introduction', title: '1. Introduction', content: '<p>WeSoft s’engage à ce que la collecte et le traitement de vos données soient conformes au règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.</p>' },
    { anchorId: 'donnees', title: '2. Données collectées', content: '<p>Nous limitons la collecte des données personnelles au strict nécessaire : informations transmises via nos formulaires et données techniques de navigation.</p>' },
    { anchorId: 'finalite', title: '3. Finalité du traitement', content: '<p>Les données recueillies servent à répondre à vos demandes, assurer le suivi commercial et améliorer l’ergonomie et les services proposés.</p>' },
    { anchorId: 'vos-droits', title: '4. Vos droits', content: '<p>Vous disposez notamment de droits d’accès, de rectification et de suppression concernant vos données personnelles.</p>' },
    { anchorId: 'cookies', title: '5. Politique de cookies', content: '<p>Notre site utilise des cookies essentiels et, avec votre accord, des outils de mesure d’audience. Vous pouvez modifier vos préférences à tout moment.</p>' },
  ],
};

const defaultLegalRichContent = Object.fromEntries(
  Object.entries(defaultLegalSections).map(([slug, sections]) => [
    slug,
    sections.map(({ title, content }) => `<h2>${title}</h2>${content}`).join(''),
  ]),
) as Record<string, string>;

function isPlaceholderLegalContent(content: unknown) {
  return typeof content === 'string' && (
    content.includes('Les informations légales détaillées peuvent être complétées')
    || content.includes('Cette page est administrable depuis Strapi')
  );
}

function isGeneratedLegalRichContent(content: unknown, slug: string) {
  return isPlaceholderLegalContent(content) || content === defaultLegalRichContent[slug];
}

async function addLegalPageHeroes(strapi: Core.Strapi) {
  const migrationStore = strapi.store({ type: 'plugin', name: 'wesoft', key: 'legal-content-section-v4' });
  if (await migrationStore.get()) return;

  const heroes = [
    { slug: 'mentions-legales', eyebrow: 'INFORMATIONS', title: 'Mentions légales', text: 'Retrouvez les informations relatives à l’éditeur du site et à ses conditions d’utilisation.' },
    { slug: 'politique-de-confidentialite', eyebrow: 'VOS DONNÉES', title: 'Politique de confidentialité', text: 'Découvrez comment WeSoft protège vos données personnelles et les droits dont vous disposez.' },
  ];

  for (const hero of heroes) {
    const page = await strapi.documents('api::page.page').findFirst({
      filters: { slug: hero.slug },
      status: 'published',
      populate: { blocks: { on: {
        'sections.hero': { populate: { image: true, buttons: true } },
        'sections.legal-content': { populate: { sections: true } },
        'sections.rich-text': { populate: '*' },
      } } },
    } as never) as unknown as { documentId: string; blocks?: DynamicBlock[] } | null;
    if (!page) continue;

    const blocks = prepareForDocumentUpdate(page.blocks || []) as DynamicBlock[];
    let changed = false;
    if (!blocks.some((block) => block.__component === 'sections.hero')) {
      blocks.unshift({ __component: 'sections.hero', ...hero, background: 'sky' });
      changed = true;
    }
    const legalContent = blocks.find((block) => block.__component === 'sections.legal-content');
    if (legalContent && (!Array.isArray(legalContent.sections) || legalContent.sections.length === 0)) {
      legalContent.sections = defaultLegalSections[hero.slug];
      changed = true;
    }
    const richTextIndex = blocks.findIndex((block) => block.__component === 'sections.rich-text');
    if (!legalContent && richTextIndex >= 0 && isGeneratedLegalRichContent(blocks[richTextIndex].content, hero.slug)) {
      blocks.splice(richTextIndex, 1, {
        __component: 'sections.legal-content',
        title: hero.title,
        text: hero.text,
        background: 'white',
        sections: defaultLegalSections[hero.slug],
      });
      changed = true;
    }
    if (changed) await strapi.documents('api::page.page').update({
      documentId: page.documentId,
      data: { blocks } as never,
      status: 'published',
    });
  }

  await migrationStore.set({ value: { completedAt: new Date().toISOString() } });
  strapi.log.info('[legal migration] Legal pages now use the dedicated legal-content section.');
}

async function migrateArticlesToBackOffice(strapi: Core.Strapi) {
  const migrationStore = strapi.store({ type: 'plugin', name: 'wesoft', key: 'articles-import-v1' });
  if (await migrationStore.get()) return;

  let importedCount = 0;
  for (const article of importedArticles) {
    const slug = String(article.data.slug);
    const existing = await strapi.documents('api::article.article').findMany({ filters: { slug }, limit: 1 } as never);
    if (existing.length > 0) continue;

    const cover = await ensureRemoteUpload(strapi, article.remoteCover);
    await strapi.documents('api::article.article').create({
      data: { ...article.data, ...(cover ? { cover } : {}) } as never,
      status: 'published',
    });
    importedCount += 1;
  }

  const existingPages = await strapi.documents('api::page.page').findMany({ filters: { slug: 'articles' }, limit: 1 } as never);
  if (existingPages.length === 0) {
    const heroImage = await ensureUpload(strapi, 'resources-hero.png', 'Actualités et ressources WeSoft');
    await strapi.documents('api::page.page').create({
      data: {
        title: 'Ressources',
        slug: 'articles',
        pageType: 'newsIndex',
        excerpt: 'Les actualités, acquisitions, interviews et analyses du groupe WeSoft.',
        seo: {
          metaTitle: 'Actualités et ressources WeSoft',
          metaDescription: 'Retrouvez les acquisitions, partenariats, interviews et analyses de WeSoft et de ses éditeurs de logiciels métiers.',
        },
        blocks: [
          {
            __component: 'sections.hero',
            eyebrow: 'ACTUALITÉS & INSIGHTS',
            title: 'Restez à la pointe de l’innovation logicielle.',
            text: 'Découvrez les acquisitions du groupe, nos partenariats technologiques et nos perspectives sur les logiciels verticaux.',
            image: heroImage,
            showDecoration: false,
            background: 'sky',
          },
          {
            __component: 'sections.article-list',
            anchorId: 'actualites',
            title: 'Toutes nos actualités',
            text: 'Filtrez les contenus par format ou recherchez un sujet.',
            limit: 24,
            background: 'sky',
          },
          {
            __component: 'sections.cta',
            title: 'Prêt à entamer un nouveau chapitre ?',
            text: 'Ensemble, donnons un nouveau souffle à votre solution logicielle et accélérons votre croissance sectorielle.',
            background: 'sky',
            buttons: [{ label: 'Prendre rendez-vous', href: '/contact', linkType: 'internal', style: 'primary' }],
          },
        ],
      } as never,
      status: 'published',
    });
  }

  await migrationStore.set({ value: { completedAt: new Date().toISOString(), importedCount } });
  strapi.log.info(`[article migration] ${importedCount} articles imported and /articles is now managed by Strapi.`);
}

async function initializeArticleSidebarCtas(strapi: Core.Strapi) {
  const migrationStore = strapi.store({ type: 'plugin', name: 'wesoft', key: 'site-config-article-sidebar-ctas-v1' });
  if (await migrationStore.get()) return;

  const config = await strapi.documents('api::site-config.site-config').findFirst({
    status: 'published',
    populate: { articleSidebarPrimaryButton: true, articleSidebarSecondaryButton: true },
  } as never) as unknown as {
    documentId: string;
    articleSidebarPrimaryTitle?: string;
    articleSidebarPrimaryText?: string;
    articleSidebarPrimaryButton?: unknown;
    articleSidebarSecondaryTitle?: string;
    articleSidebarSecondaryText?: string;
    articleSidebarSecondaryButton?: unknown;
  } | null;

  if (config) {
    const data: Record<string, unknown> = {};
    if (!config.articleSidebarPrimaryTitle) data.articleSidebarPrimaryTitle = siteConfig.articleSidebarPrimaryTitle;
    if (!config.articleSidebarPrimaryText) data.articleSidebarPrimaryText = siteConfig.articleSidebarPrimaryText;
    if (!config.articleSidebarPrimaryButton) data.articleSidebarPrimaryButton = siteConfig.articleSidebarPrimaryButton;
    if (!config.articleSidebarSecondaryTitle) data.articleSidebarSecondaryTitle = siteConfig.articleSidebarSecondaryTitle;
    if (!config.articleSidebarSecondaryText) data.articleSidebarSecondaryText = siteConfig.articleSidebarSecondaryText;
    if (!config.articleSidebarSecondaryButton) data.articleSidebarSecondaryButton = siteConfig.articleSidebarSecondaryButton;

    if (Object.keys(data).length) {
      await strapi.documents('api::site-config.site-config').update({
        documentId: config.documentId,
        data: data as never,
        status: 'published',
      });
    }
  }

  await migrationStore.set({ value: { completedAt: new Date().toISOString() } });
  strapi.log.info('[site configuration] Article sidebar CTAs initialized.');
}

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    registerIconPicker(strapi);
  },
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const config = await strapi.documents('api::site-config.site-config').findFirst();
    if (!config) await strapi.documents('api::site-config.site-config').create({ data: siteConfig as never, status: 'published' });

    const forms = await strapi.documents('api::form.form').findMany({ limit: 1 });
    const contactForm = forms[0] || await strapi.documents('api::form.form').create({ data: { name: 'Contact', slug: 'contact', title: 'Parlons de votre projet', description: 'Présentez-nous votre entreprise ou votre besoin.', submitLabel: 'Envoyer ma demande', successMessage: 'Merci, nous revenons vers vous rapidement.', fields: contactFormFields } as never, status: 'published' });

    const initialPages = [home, ...secondaryPages, { title: 'Contact', slug: 'contact', pageType: 'contact', excerpt: 'Présentez-nous votre projet.', blocks: [{ __component: 'sections.form-section', eyebrow: 'CONTACT', title: 'Entrons en contact', text: 'Vous dirigez un éditeur ou souhaitez échanger avec WeSoft ? Écrivez-nous.', form: contactForm.documentId, background: 'sky' }] }];
    for (const page of initialPages) {
      const existing = await strapi.documents('api::page.page').findMany({ filters: { slug: page.slug }, limit: 1 });
      if (existing.length === 0) await strapi.documents('api::page.page').create({ data: page as never, status: 'published' });
    }

    await migrateHomepageToBackOffice(strapi);
    await migrateWhoWeAreToHomepageAnchor(strapi);
    await repairHomepageMediaRelations(strapi);
    await migrateTestimonialMetricsToSlides(strapi);
    await migrateBusinessCharacteristicsSpans(strapi);
    await grantArticlePublishingToAuthors(strapi);
    await migrateContactPageToFullSection(strapi);
    await migrateArticlesToBackOffice(strapi);
    await addTiltedPageHeroes(strapi);
    await restoreContactFormRelation(strapi);
    await addLegalPageHeroes(strapi);
    await migrateRichTextToTiptap(strapi);
    await initializeArticleSidebarCtas(strapi);
  },
};
