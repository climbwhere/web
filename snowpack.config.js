/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    "src": "/",
    "public": {url: "/", static: true, resolve: false}
  },
  plugins: [
    '@snowpack/plugin-svelte',
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    {"match": "routes", "src": ".*", "dest": "/index.html"}
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
