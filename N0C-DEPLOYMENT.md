# Deploiement Strapi sur PlanetHoster N0C

## Configuration Passenger

Le fichier `.htaccess` genere par N0C doit conserver son bloc CloudLinux et lancer le fichier `server.js` situe a la racine du projet :

```apache
# DO NOT REMOVE. CLOUDLINUX PASSENGER CONFIGURATION BEGIN
PassengerAppRoot "/home/zrrwnvkz/wesoft"
PassengerBaseURI "/"
PassengerNodejs "/home/zrrwnvkz/nodevenv/wesoft/22/bin/node"
PassengerAppType node
PassengerStartupFile server.js
# DO NOT REMOVE. CLOUDLINUX PASSENGER CONFIGURATION END

# DO NOT REMOVE OR MODIFY. CLOUDLINUX ENV VARS CONFIGURATION BEGIN
<IfModule Litespeed>
</IfModule>
# DO NOT REMOVE OR MODIFY. CLOUDLINUX ENV VARS CONFIGURATION END

PassengerFriendlyErrorPages off
PassengerAppEnv production
```

Le `server.js` du depot charge explicitement l'application compilee dans `dist`. Il ne faut pas remettre le lanceur N0C qui appelle `createStrapi()` sans `appDir` ni `distDir`, car il tente alors de charger directement les fichiers TypeScript de `config/`.

## Commandes de deploiement

Depuis `/home/zrrwnvkz/wesoft` :

```bash
npm ci --include=dev
npm run build
```

`npm ci` installe exactement les versions verrouillees dans `package-lock.json` et remplace l'arbre de dependances existant. Cela evite de compiler l'administration avec plusieurs versions incompatibles des paquets `@strapi/*`.

Le dossier `dist/` est ignore par Git : le build doit donc etre execute sur N0C apres chaque deploiement contenant une modification du backend ou de l'administration Strapi. Redemarrer ensuite l'application depuis le panneau N0C.

Avant le build, verifier que les paquets principaux utilisent tous la meme version :

```bash
npm ls @strapi/admin @strapi/content-manager @strapi/content-type-builder @strapi/upload @strapi/strapi
```

Ils doivent tous afficher la meme version que `@strapi/strapi` dans `package.json`. Si plusieurs versions apparaissent, ne pas reutiliser le build admin existant : effectuer `npm ci --include=dev`, supprimer uniquement `dist/build`, puis relancer `npm run build`.

## Notifications e-mail des formulaires

Le provider `@strapi/provider-email-nodemailer` utilise les variables suivantes :

```dotenv
PUBLIC_URL=https://wesoft.wenegoce.fr
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_REQUIRE_TLS=true
SMTP_USERNAME=mailer@example.com
SMTP_PASSWORD=mot-de-passe-smtp
EMAIL_DEFAULT_FROM=WeSoft <mailer@example.com>
EMAIL_DEFAULT_REPLY_TO=contact@example.com
FORM_NOTIFICATION_DEFAULT_TO=contact@example.com
```

Dans chaque entree **Formulaire**, `notificationRecipients` accepte plusieurs adresses separees par une virgule, un point-virgule ou un retour a la ligne. Cette liste est prioritaire sur `FORM_NOTIFICATION_DEFAULT_TO`.

## Variables d'environnement

Configurer les variables suivantes dans l'application Node.js N0C (ne pas committer leurs valeurs reelles) :

```dotenv
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

APP_KEYS=cle-1,cle-2,cle-3,cle-4
API_TOKEN_SALT=valeur-secrete
ADMIN_JWT_SECRET=valeur-secrete
TRANSFER_TOKEN_SALT=valeur-secrete
JWT_SECRET=valeur-secrete
ENCRYPTION_KEY=valeur-secrete

DATABASE_CLIENT=mysql
DATABASE_HOST=adresse-mysql-n0c
DATABASE_PORT=3306
DATABASE_NAME=nom-base
DATABASE_USERNAME=utilisateur
DATABASE_PASSWORD=mot-de-passe
DATABASE_SSL=false
```

Le port public est gere par Passenger. La valeur `PORT=1337` reste le port d'ecoute interne de Strapi.

## Verification

Avant le redemarrage, ces deux fichiers doivent exister :

```text
dist/src/index.js
dist/config/database.js
```

Si le premier manque, `server.js` affiche volontairement un message demandant d'executer `npm run build` au lieu de demarrer une application partiellement compilee.
