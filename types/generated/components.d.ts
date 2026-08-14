import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsArticleList extends Struct.ComponentSchema {
  collectionName: 'components_sections_article_lists';
  info: {
    displayName: 'Liste d\u2019articles';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    background: Schema.Attribute.Enumeration<
      ['white', 'sky', 'lavender', 'blue', 'navy', 'gradient']
    > &
      Schema.Attribute.DefaultTo<'white'>;
    eyebrow: Schema.Attribute.String;
    limit: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 24;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<6>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsBusinessCharacteristics
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_business_characteristics';
  info: {
    description: 'Cartes avec couleurs libres et contraste de texte automatique c\u00F4t\u00E9 site';
    displayName: 'Caract\u00E9ristiques m\u00E9tier';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    background: Schema.Attribute.Enumeration<
      ['white', 'sky', 'lavender', 'blue', 'navy', 'gradient']
    > &
      Schema.Attribute.DefaultTo<'sky'>;
    button: Schema.Attribute.Component<'shared.button', false>;
    cards: Schema.Attribute.Component<'shared.feature-item', true>;
    eyebrow: Schema.Attribute.String;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsContact extends Struct.ComponentSchema {
  collectionName: 'components_sections_contacts';
  info: {
    displayName: 'Contact complet';
  };
  attributes: {
    address: Schema.Attribute.Text;
    background: Schema.Attribute.Enumeration<
      ['white', 'sky', 'lavender', 'blue', 'navy', 'gradient']
    > &
      Schema.Attribute.DefaultTo<'sky'>;
    form: Schema.Attribute.Relation<'manyToOne', 'api::form.form'>;
    officeIcon: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<'global::icon-picker'>;
    officeName: Schema.Attribute.String;
    officeTitle: Schema.Attribute.String;
    socialHref: Schema.Attribute.String;
    socialIcon: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<'global::icon-picker'>;
    socialLabel: Schema.Attribute.String;
    socialLinkIcon: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<'global::icon-picker'>;
    socialText: Schema.Attribute.Text;
    socialTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_ctas';
  info: {
    displayName: 'Appel \u00E0 l\u2019action';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    background: Schema.Attribute.Enumeration<
      ['white', 'sky', 'lavender', 'blue', 'navy', 'gradient']
    > &
      Schema.Attribute.DefaultTo<'blue'>;
    buttons: Schema.Attribute.Component<'shared.button', true>;
    eyebrow: Schema.Attribute.String;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFeatureGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_feature_grids';
  info: {
    displayName: 'Grille de fonctionnalit\u00E9s';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    background: Schema.Attribute.Enumeration<
      ['white', 'sky', 'lavender', 'blue', 'navy', 'gradient']
    > &
      Schema.Attribute.DefaultTo<'white'>;
    eyebrow: Schema.Attribute.String;
    features: Schema.Attribute.Component<'shared.feature-item', true>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFormSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_form_sections';
  info: {
    description: 'Ins\u00E8re un formulaire construit dans la collection Formulaires';
    displayName: 'Formulaire';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    background: Schema.Attribute.Enumeration<
      ['white', 'sky', 'lavender', 'blue', 'navy', 'gradient']
    > &
      Schema.Attribute.DefaultTo<'sky'>;
    eyebrow: Schema.Attribute.String;
    form: Schema.Attribute.Relation<'manyToOne', 'api::form.form'>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    background: Schema.Attribute.Enumeration<
      ['white', 'sky', 'lavender', 'blue', 'navy', 'gradient']
    > &
      Schema.Attribute.DefaultTo<'lavender'>;
    buttons: Schema.Attribute.Component<'shared.button', true>;
    eyebrow: Schema.Attribute.String;
    floatingIcon: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<'global::icon-picker'>;
    floatingText: Schema.Attribute.String;
    floatingTitle: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    showDecoration: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsLegalContent extends Struct.ComponentSchema {
  collectionName: 'components_sections_legal_contents';
  info: {
    displayName: 'Contenu l\u00E9gal';
  };
  attributes: {
    background: Schema.Attribute.Enumeration<
      ['white', 'sky', 'lavender', 'blue', 'navy', 'gradient']
    > &
      Schema.Attribute.DefaultTo<'sky'>;
    sections: Schema.Attribute.Component<'shared.legal-section', true>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsMetrics extends Struct.ComponentSchema {
  collectionName: 'components_sections_metrics';
  info: {
    displayName: 'Chiffres cl\u00E9s';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    background: Schema.Attribute.Enumeration<
      ['white', 'sky', 'lavender', 'blue', 'navy', 'gradient']
    > &
      Schema.Attribute.DefaultTo<'blue'>;
    metrics: Schema.Attribute.Component<'shared.metric', true>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsProcess extends Struct.ComponentSchema {
  collectionName: 'components_sections_processes';
  info: {
    displayName: 'Processus';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    background: Schema.Attribute.Enumeration<
      ['white', 'sky', 'lavender', 'blue', 'navy', 'gradient']
    > &
      Schema.Attribute.DefaultTo<'sky'>;
    eyebrow: Schema.Attribute.String;
    steps: Schema.Attribute.Component<'shared.process-step', true>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsRichText extends Struct.ComponentSchema {
  collectionName: 'components_sections_rich_texts';
  info: {
    displayName: 'Texte riche';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    background: Schema.Attribute.Enumeration<
      ['white', 'sky', 'lavender', 'blue', 'navy', 'gradient']
    > &
      Schema.Attribute.DefaultTo<'white'>;
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    eyebrow: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsSoftwareShowcase extends Struct.ComponentSchema {
  collectionName: 'components_sections_software_showcases';
  info: {
    displayName: 'Vitrine logiciels';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    background: Schema.Attribute.Enumeration<
      ['white', 'sky', 'lavender', 'blue', 'navy', 'gradient']
    > &
      Schema.Attribute.DefaultTo<'white'>;
    items: Schema.Attribute.Component<'shared.software', true>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsTeam extends Struct.ComponentSchema {
  collectionName: 'components_sections_teams';
  info: {
    displayName: '\u00C9quipe';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    background: Schema.Attribute.Enumeration<
      ['white', 'sky', 'lavender', 'blue', 'navy', 'gradient']
    > &
      Schema.Attribute.DefaultTo<'white'>;
    members: Schema.Attribute.Component<'shared.team-member', true>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsTestimonialMetrics extends Struct.ComponentSchema {
  collectionName: 'components_sections_testimonial_metrics';
  info: {
    displayName: 'Slider t\u00E9moignages et chiffres';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    author: Schema.Attribute.String;
    avatar: Schema.Attribute.Media<'images'>;
    background: Schema.Attribute.Enumeration<
      ['white', 'sky', 'lavender', 'blue', 'navy', 'gradient']
    > &
      Schema.Attribute.DefaultTo<'blue'>;
    metrics: Schema.Attribute.Component<'shared.metric', true>;
    quote: Schema.Attribute.Text;
    quoteIcon: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<'global::icon-picker'>;
    role: Schema.Attribute.String;
    testimonials: Schema.Attribute.Component<'shared.testimonial', true>;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    description: 'Bouton interne ou externe avec variante visuelle';
    displayName: 'Bouton';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    linkType: Schema.Attribute.Enumeration<['internal', 'external']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'internal'>;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    style: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'ghost', 'light']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedCapability extends Struct.ComponentSchema {
  collectionName: 'components_shared_capabilities';
  info: {
    displayName: 'Fonctionnalit\u00E9';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_feature_items';
  info: {
    displayName: 'Carte / caract\u00E9ristique';
  };
  attributes: {
    backgroundColor: Schema.Attribute.String;
    icon: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<'global::icon-picker'>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFieldOption extends Struct.ComponentSchema {
  collectionName: 'components_shared_field_options';
  info: {
    displayName: 'Option de champ';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_columns';
  info: {
    description: 'Le footer accepte au maximum 5 colonnes';
    displayName: 'Colonne de footer';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.nav-child', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFormField extends Struct.ComponentSchema {
  collectionName: 'components_shared_form_fields';
  info: {
    description: 'Champ configurable du constructeur de formulaires';
    displayName: 'Champ de formulaire';
  };
  attributes: {
    helpText: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    options: Schema.Attribute.Component<'shared.field-option', true>;
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    type: Schema.Attribute.Enumeration<
      [
        'text',
        'email',
        'tel',
        'textarea',
        'select',
        'checkbox',
        'number',
        'date',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'text'>;
    width: Schema.Attribute.Enumeration<['full', 'half']> &
      Schema.Attribute.DefaultTo<'full'>;
  };
}

export interface SharedLegalSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_legal_sections';
  info: {
    displayName: 'Section l\u00E9gale';
  };
  attributes: {
    anchorId: Schema.Attribute.String & Schema.Attribute.Required;
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMetric extends Struct.ComponentSchema {
  collectionName: 'components_shared_metrics';
  info: {
    displayName: 'Chiffre cl\u00E9';
  };
  attributes: {
    icon: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<'global::icon-picker'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedNavChild extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_children';
  info: {
    displayName: 'Sous-lien';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<'global::icon-picker'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    linkType: Schema.Attribute.Enumeration<['internal', 'external']> &
      Schema.Attribute.DefaultTo<'internal'>;
  };
}

export interface SharedNavItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_items';
  info: {
    displayName: 'Lien de navigation';
  };
  attributes: {
    children: Schema.Attribute.Component<'shared.nav-child', true>;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    linkType: Schema.Attribute.Enumeration<['internal', 'external']> &
      Schema.Attribute.DefaultTo<'internal'>;
  };
}

export interface SharedProcessStep extends Struct.ComponentSchema {
  collectionName: 'components_shared_process_steps';
  info: {
    displayName: '\u00C9tape';
  };
  attributes: {
    icon: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<'global::icon-picker'>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    noIndex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSoftware extends Struct.ComponentSchema {
  collectionName: 'components_shared_softwares';
  info: {
    displayName: 'Logiciel';
  };
  attributes: {
    accentColor: Schema.Attribute.String;
    button: Schema.Attribute.Component<'shared.button', false>;
    capabilities: Schema.Attribute.Component<'shared.capability', true>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    logo: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    sector: Schema.Attribute.String;
  };
}

export interface SharedTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_shared_team_members';
  info: {
    displayName: "Membre de l'\u00E9quipe";
  };
  attributes: {
    biography: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'>;
    role: Schema.Attribute.String;
  };
}

export interface SharedTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_shared_testimonials';
  info: {
    displayName: 'T\u00E9moignage';
  };
  attributes: {
    author: Schema.Attribute.String & Schema.Attribute.Required;
    avatar: Schema.Attribute.Media<'images'>;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
    role: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.article-list': SectionsArticleList;
      'sections.business-characteristics': SectionsBusinessCharacteristics;
      'sections.contact': SectionsContact;
      'sections.cta': SectionsCta;
      'sections.feature-grid': SectionsFeatureGrid;
      'sections.form-section': SectionsFormSection;
      'sections.hero': SectionsHero;
      'sections.legal-content': SectionsLegalContent;
      'sections.metrics': SectionsMetrics;
      'sections.process': SectionsProcess;
      'sections.rich-text': SectionsRichText;
      'sections.software-showcase': SectionsSoftwareShowcase;
      'sections.team': SectionsTeam;
      'sections.testimonial-metrics': SectionsTestimonialMetrics;
      'shared.button': SharedButton;
      'shared.capability': SharedCapability;
      'shared.feature-item': SharedFeatureItem;
      'shared.field-option': SharedFieldOption;
      'shared.footer-column': SharedFooterColumn;
      'shared.form-field': SharedFormField;
      'shared.legal-section': SharedLegalSection;
      'shared.metric': SharedMetric;
      'shared.nav-child': SharedNavChild;
      'shared.nav-item': SharedNavItem;
      'shared.process-step': SharedProcessStep;
      'shared.seo': SharedSeo;
      'shared.software': SharedSoftware;
      'shared.team-member': SharedTeamMember;
      'shared.testimonial': SharedTestimonial;
    }
  }
}
