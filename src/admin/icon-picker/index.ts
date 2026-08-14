import { Shapes } from 'lucide-react';

export const iconPickerCustomField = {
  name: 'icon-picker',
  type: 'json' as const,
  intlLabel: {
    id: 'icon-picker.label',
    defaultMessage: 'Icône',
  },
  intlDescription: {
    id: 'icon-picker.description',
    defaultMessage: 'Sélecteur visuel Lucide avec couleur, taille et épaisseur personnalisables',
  },
  icon: Shapes,
  components: {
    Input: async () => import('./IconPickerInput'),
  },
};
