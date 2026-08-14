import type { Core } from '@strapi/strapi';

export const ICON_PICKER_FIELD_NAME = 'icon-picker';

/**
 * Registers the portable JSON value used by the admin icon picker.
 * Copy this file and src/admin/icon-picker to reuse the field in another app.
 */
export function registerIconPicker(strapi: Core.Strapi) {
  strapi.customFields.register({
    name: ICON_PICKER_FIELD_NAME,
    type: 'json',
  });
}
