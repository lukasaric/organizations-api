# Orgs API Backend

### Local Development
1. `export NODE_ENV="dev-local"` Assures we are not using a "development" value which can be confused with the development cloud environment. This is *IMPORTANT* since this variable identifies that you need a sandbox built for your device. These scripts have not been tested on Windows OS.
2. `npm install`
3. `cp .env.sample .env`
5. `npm start`

### Linting
1. `npm run lint` To debug issues with eslint. On commit, best practices will be checked and fixed if possible, otherwise the precommit will reject your code. Its recommended that you use a IDE plugin to check while developing.
