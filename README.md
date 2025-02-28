# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
## Add environment variable for API URL
```sh
- create .env file in root of the project directory
- add VITE_API_URL=http://127.0.0.1:3000/api/v1
- add VITE_PORT=5173
- add VITE_HOST=0.0.0.0
```

### API backend (Optional)
Configure backend created in Ruby on Rails
https://github.com/sonianand11/rails_api_example

### Start server Using Docker
Assuming you have docker installed if you not follow [Installation instruction](https://docs.docker.com/engine/install/).

Execute this command from root of project folder.
```
sudo docker compose up --build
```