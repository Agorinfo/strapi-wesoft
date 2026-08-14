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
npm install --include=dev
npm run build
```

Le dossier `dist/` est ignore par Git : le build doit donc etre execute sur N0C apres chaque deploiement contenant une modification du backend ou de l'administration Strapi. Redemarrer ensuite l'application depuis le panneau N0C.

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
