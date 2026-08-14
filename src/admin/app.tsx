import type { StrapiApp } from '@strapi/strapi/admin';
import { iconPickerCustomField } from './icon-picker';

export default {
  config: {
    locales: ['fr'],
  },
  register(app: StrapiApp) {
    app.customFields.register(iconPickerCustomField);
  },
};
