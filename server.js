const strapi = require('@strapi/strapi');
dev = true
if (dev === true)
    strapi.createStrapi({"autoReload": { "enabled": true }
    }).start();
else
    strapi.createStrapi().start();