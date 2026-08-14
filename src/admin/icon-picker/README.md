# Strapi Icon Picker

Champ personnalisé Strapi 5 basé sur `lucide-react` et Font Awesome Free Brands.

Valeur enregistrée :

```json
{ "name": "Rocket", "library": "lucide", "color": "#004b93", "size": 32, "strokeWidth": 2 }
```

## Réutilisation dans un autre projet

1. Installer `lucide-react` et `@fortawesome/free-brands-svg-icons` dans Strapi.
2. Copier `src/admin/icon-picker` et enregistrer `iconPickerCustomField` dans `src/admin/app.tsx`.
3. Copier `src/icon-picker/server.ts` et appeler `registerIconPicker(strapi)` dans le lifecycle `register`.
4. Utiliser le champ dans un schéma :

```json
{
  "type": "customField",
  "customField": "global::icon-picker"
}
```

Le champ ne dépend d'aucune API distante. Pour les marques, il conserve le tracé validé fourni par Font Awesome afin que le frontend n'embarque pas la bibliothèque entière.
