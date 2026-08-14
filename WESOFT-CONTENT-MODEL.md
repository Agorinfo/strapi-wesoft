# Modèle éditorial WeSoft

## Configuration globale

Le single type **Configuration du site** pilote le logo, la navigation, le CTA du header, le texte et les colonnes du footer, les réseaux sociaux, les liens légaux et le copyright.

## Pages et sections

Une page est composée dans la zone dynamique `blocks`. Les sections disponibles sont :

- Hero ;
- grille de fonctionnalités ;
- processus d’acquisition ;
- vitrine logiciels et expertises sectorielles ;
- caractéristiques métier ;
- témoignage avec chiffres clés ;
- équipe dirigeante ;
- CTA ;
- liste d’articles ;
- formulaire simple ou contact complet ;
- contenu légal avec sommaire ;
- texte riche.

Chaque section propose un fond parmi `white`, `sky`, `lavender`, `blue`, `navy` et `gradient`. Les images, logos, textes, liens, couleurs d’accent et listes sont administrables dans Strapi.

## Articles et ressources

La collection **Articles** pilote la liste des ressources et les pages détail. Les champs `resourceType`, `readingTime`, `featured`, `sidebarTitle`, `sidebarText`, `sidebarButton` et `relatedArticles` alimentent les filtres, le temps de lecture et les encarts du design.

## Formulaires

Créer un formulaire dans la collection **Formulaires**, ajouter et ordonner ses champs, puis le relier à une section Formulaire ou Contact complet. Les réponses sont enregistrées dans **Soumissions de formulaire**.

Pour garder les soumissions privées, utiliser un jeton API serveur dans `STRAPI_API_TOKEN` plutôt que d’ouvrir la collection au rôle Public.
